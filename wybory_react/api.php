<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = ""; 
$dbname = "aplikacja_wyborcza";

// Stwórz połączenie
$conn = new mysqli($servername, $username, $password, $dbname);

// Sprawdź połączenie
if ($conn->connect_error) {
    error_log("Connection failed: " . $conn->connect_error);
    die("Connection failed: " . $conn->connect_error);
}

$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));

if ($method == 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($method == 'GET' && $request[0] == 'candidates') {
    $sql = "SELECT * FROM kandydaci";
    $result = $conn->query($sql);

    $candidates = array();
    while($row = $result->fetch_assoc()) {
        $candidates[] = $row;
    }

    echo json_encode($candidates);
} elseif ($method == 'GET' && $request[0] == 'voters') {
    $username = $_GET['username'] ?? '';
    if ($username) {
        $sql = "SELECT username, glosowal FROM uzytkownicy WHERE username = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        $voters = $result->fetch_all(MYSQLI_ASSOC);
    } else {
        $sql = "SELECT username, glosowal FROM uzytkownicy";
        $result = $conn->query($sql);

        $voters = array();
        while($row = $result->fetch_assoc()) {
            $voters[] = $row;
        }
    }

    echo json_encode($voters);
} elseif ($method == 'POST' && $request[0] == 'vote') {
    $input = json_decode(file_get_contents('php://input'), true);
    error_log("Vote input: " . print_r($input, true));

    $candidateId = $input['candidateId'];

    $sql = "UPDATE kandydaci SET glosy = glosy + 1 WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $candidateId);
    $stmt->execute();

    $username = $input['username'];
    $sql = "UPDATE uzytkownicy SET glosowal = 1 WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();

    echo json_encode(array("message" => "Vote counted"));
} elseif ($method == 'POST' && $request[0] == 'login') {
    $input = json_decode(file_get_contents('php://input'), true);
    error_log("Login input: " . print_r($input, true));
    
    $username = $input['username'];
    $password = $input['password'];

    $sql = "SELECT * FROM uzytkownicy WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user && password_verify($password, $user['password'])) {
        echo json_encode(array("success" => true, "user" => array("username" => $user['username'])));
    } else {
        echo json_encode(array("success" => false, "message" => "Invalid credentials"));
    }
} elseif ($method == 'POST' && $request[0] == 'register') {
    $input = json_decode(file_get_contents('php://input'), true);
    error_log("Register input: " . print_r($input, true));
    
    $username = $input['username'];
    $password = password_hash($input['password'], PASSWORD_BCRYPT);

    $sql = "INSERT INTO uzytkownicy (username, password) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $username, $password);

    if ($stmt->execute()) {
        echo json_encode(array("success" => true));
    } else {
        echo json_encode(array("success" => false, "message" => "Registration failed"));
    }
} else {
    echo json_encode(array("message" => "Invalid request"));
}

$conn->close();
?>

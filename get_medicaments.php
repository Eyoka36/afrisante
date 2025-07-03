<?php
// get_medicaments.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Gérer les requêtes OPTIONS (pré-vol CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Connexion à la base de données
$servername = "localhost";
$username = "votre_utilisateur";
$password = "votre_mot_de_passe";
$dbname = "sante_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Échec de la connexion à la base de données: " . $conn->connect_error]));
}

// Récupérer l'utilisateur_id depuis les paramètres GET
// Exemple d'URL: get_medicaments.php?utilisateur_id=1
$utilisateur_id = isset($_GET['utilisateur_id']) ? (int)$_GET['utilisateur_id'] : null;

if (is_null($utilisateur_id) || !is_numeric($utilisateur_id)) {
    echo json_encode(["success" => false, "message" => "ID utilisateur manquant ou invalide."]);
    $conn->close();
    exit();
}

$medicaments = [];
$stmt = $conn->prepare("SELECT id, nom_medicament, dose, heure, date_debut, date_fin, rappel_envoye FROM medicaments WHERE utilisateur_id = ? ORDER BY date_debut DESC, heure ASC");
$stmt->bind_param("i", $utilisateur_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $medicaments[] = $row;
    }
    echo json_encode(["success" => true, "data" => $medicaments]);
} else {
    echo json_encode(["success" => true, "data" => [], "message" => "Aucun médicament trouvé pour cet utilisateur."]);
}

$stmt->close();
$conn->close();
?>
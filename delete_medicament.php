<?php
// delete_medicament.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
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

// Récupérer l'ID du médicament et l'ID utilisateur à supprimer
$data = json_decode(file_get_contents("php://input"));

if (
    !isset($data->id) || !is_numeric($data->id) ||
    !isset($data->utilisateur_id) || !is_numeric($data->utilisateur_id)
) {
    echo json_encode(["success" => false, "message" => "ID du médicament ou ID utilisateur manquant/invalide."]);
    $conn->close();
    exit();
}

$id = (int)$data->id;
$utilisateur_id = (int)$data->utilisateur_id;

$stmt = $conn->prepare("DELETE FROM medicaments WHERE id = ? AND utilisateur_id = ?");
$stmt->bind_param("ii", $id, $utilisateur_id);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(["success" => true, "message" => "Médicament supprimé avec succès."]);
    } else {
        echo json_encode(["success" => false, "message" => "Aucun médicament trouvé avec cet ID et utilisateur."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Erreur lors de la suppression du médicament: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
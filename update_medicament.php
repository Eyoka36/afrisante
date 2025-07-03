<?php
// update_medicament.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
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

// Récupérer les données brutes (JSON) de la requête PUT
$data = json_decode(file_get_contents("php://input"));

// Validation des données nécessaires
if (
    !isset($data->id) || !is_numeric($data->id) ||
    !isset($data->utilisateur_id) || !is_numeric($data->utilisateur_id) ||
    !isset($data->nom_medicament) || empty($data->nom_medicament) ||
    !isset($data->dose) || empty($data->dose) ||
    !isset($data->heure) || empty($data->heure) ||
    !isset($data->date_debut) || empty($data->date_debut)
) {
    echo json_encode(["success" => false, "message" => "ID ou données manquantes/invalides pour la mise à jour."]);
    $conn->close();
    exit();
}

$id = (int)$data->id;
$utilisateur_id = (int)$data->utilisateur_id;
$nom_medicament = $conn->real_escape_string($data->nom_medicament);
$dose = $conn->real_escape_string($data->dose);
$heure = $conn->real_escape_string($data->heure);
$date_debut = $conn->real_escape_string($data->date_debut);
$date_fin = isset($data->date_fin) && !empty($data->date_fin) ? $conn->real_escape_string($data->date_fin) : null;
$rappel_envoye = isset($data->rappel_envoye) ? (int)$data->rappel_envoye : 0; // Gérer la mise à jour du rappel

$stmt = $conn->prepare("UPDATE medicaments SET nom_medicament=?, dose=?, heure=?, date_debut=?, date_fin=?, rappel_envoye=? WHERE id=? AND utilisateur_id=?");
$stmt->bind_param("sssssiii", $nom_medicament, $dose, $heure, $date_debut, $date_fin, $rappel_envoye, $id, $utilisateur_id);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(["success" => true, "message" => "Médicament mis à jour avec succès."]);
    } else {
        echo json_encode(["success" => false, "message" => "Aucun médicament trouvé avec cet ID/utilisateur ou aucune modification effectuée."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Erreur lors de la mise à jour du médicament: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
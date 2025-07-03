<?php
// add_medicament.php
header("Access-Control-Allow-Origin: *"); // À adapter en production pour la sécurité CORS
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Gérer les requêtes OPTIONS (pré-vol CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Connexion à la base de données (à adapter avec vos identifiants)
$servername = "localhost";
$username = "votre_utilisateur";
$password = "votre_mot_de_passe";
$dbname = "sante_db"; // Utilisation de votre nom de base de données

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Échec de la connexion à la base de données: " . $conn->connect_error]));
}

// Récupérer les données POST brutes (JSON)
$data = json_decode(file_get_contents("php://input"));

// Validation des données nécessaires
// utilisateur_id est crucial car c'est une clé étrangère
if (
    !isset($data->utilisateur_id) || !is_numeric($data->utilisateur_id) ||
    !isset($data->nom_medicament) || empty($data->nom_medicament) ||
    !isset($data->dose) || empty($data->dose) ||
    !isset($data->heure) || empty($data->heure) ||
    !isset($data->date_debut) || empty($data->date_debut)
) {
    echo json_encode(["success" => false, "message" => "Données manquantes ou invalides pour le médicament."]);
    $conn->close();
    exit();
}

$utilisateur_id = (int)$data->utilisateur_id;
$nom_medicament = $conn->real_escape_string($data->nom_medicament);
$dose = $conn->real_escape_string($data->dose);
$heure = $conn->real_escape_string($data->heure);
$date_debut = $conn->real_escape_string($data->date_debut);
// date_fin est optionnel, si non fourni, il sera NULL dans la base
$date_fin = isset($data->date_fin) && !empty($data->date_fin) ? $conn->real_escape_string($data->date_fin) : null;
// rappel_envoye est par défaut 0, pas besoin de le recevoir du frontend ici

$stmt = $conn->prepare("INSERT INTO medicaments (utilisateur_id, nom_medicament, dose, heure, date_debut, date_fin) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("isssss", $utilisateur_id, $nom_medicament, $dose, $heure, $date_debut, $date_fin);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Médicament ajouté avec succès.", "id" => $conn->insert_id]);
} else {
    echo json_encode(["success" => false, "message" => "Erreur lors de l'ajout du médicament: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
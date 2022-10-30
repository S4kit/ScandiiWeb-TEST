<?php
include("../Model/products.php");
class Dothis
{

    public function indexing()
    {
        $starts = new Product();
        $starts->showAll();
    }
    public function supression()
    {
        $starts = new Product();
        $toDelete = [];
        $toDelete = json_decode(file_get_contents('php://input'));
        $starts->DeleteCheck($toDelete);
    }
    public function addProduct()
    {
        $starts = new Product();
        $toAdd = [];
        $toAdd = json_decode(file_get_contents('php://input'));
        $starts->checkDouble($toAdd);

    }

}
$dothis = new Dothis();
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $dothis->indexing();
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $dothis->supression();
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $dothis->addProduct();
}
?>
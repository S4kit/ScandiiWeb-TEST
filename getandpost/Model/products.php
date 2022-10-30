<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header('Content-Type: application/json');
class Product
{
   private $id;
   private $sku;
   private $name;
   private $price;
   private $type;
   private $spec;
   public $con = null;


   public function __construct()
   {
      $host = "localhost";
      $user = "root";
      $password = "";
      $dbname = "webdevtest";
      $this->con = mysqli_connect($host, $user, $password, $dbname);
      if (!$this->con) {
         die("Connection failed: " . mysqli_connect_error());
      }


   }

   public function setsku($sku)
   {
      $this->name = $sku;
   }
   public function getsku()
   {
      return $this->sku;
   }
   public function setprice($price)
   {
      $this->price = $price;
   }
   public function getprice()
   {
      return $this->price;
   }
   public function setName($name)
   {
      $this->name = $name;
   }
   public function getName()
   {
      return $this->name;
   }
   public function settype($type)
   {
      $this->type = $type;
   }
   public function gettype()
   {
      return $this->type;
   }
   public function setspec($spec)
   {
      $this->type = $spec;
   }
   public function getspec()
   {
      return $this->spec;
   }

   public function showAll()
   {
      $sql = "select * from produit";
      $result = mysqli_query($this->con, $sql);
      if (!$result) {
         http_response_code(404);
         die(mysqli_error($this->con));
      }
      echo '[';
      for ($i = 0; $i < mysqli_num_rows($result); $i++) {
         echo ($i > 0 ? ',' : '') . json_encode(mysqli_fetch_object($result));
      }
      echo ']';
   }
   public function DeleteCheck($toDelete)
   {
      $ids = implode(",", $toDelete);
      $sql = "DELETE FROM produit WHERE id IN ($ids)";
      $result = mysqli_query($this->con, $sql);


      if (!$result) {
         http_response_code(404);
         die(mysqli_error($this->con));
      }
   }

   public function AddArticle($toAdd)
   {
      $sql = "INSERT INTO produit(sku, name, price, type, spec) VALUES ('" . $toAdd[0] . "','" . $toAdd[1] . "','" . $toAdd[2] . "','" . $toAdd[3] . "','" . $toAdd[4] . "')";
      $result = mysqli_query($this->con, $sql);
      if (!$result) {
         http_response_code(404);
         die(mysqli_error($this->con));
      }
   }
   public function checkDouble($toAdd)
   {
      $sql = "SELECT sku from produit where sku='" . $toAdd[0] . "'";
      $result = mysqli_query($this->con, $sql);
      if (mysqli_num_rows($result) < 1) {
         $this->AddArticle($toAdd);
      } else {
         http_response_code(404);
         die(mysqli_error($this->con));
      }

   }
}
?>
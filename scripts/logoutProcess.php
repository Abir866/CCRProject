<?php

$query = "SELECT my_Order.order_id,
                 my_Order.customer_id,
                 my_Order.order_status,
                 my_OrderItem. *
                 
          FROM my_OrderItem, my_Order
          WHERE my_Oder.order_id = my_OrderItem.order_id and
                my_Order.order_status='IP' and
                my_Order.customer_id= $customerID";
$items = mysqli_query($db, $query);
if($items != null) $numRecords = mysqli_num_rows($items);


if ($numRecords == 0){
    $query = "SELECT order_id,
                     customer_id
                     order_status
              FROM my_Order
              WHERE order_status = 'IP' and
                    customer_id = $customerID";

    $orphanedOrders = mysqli_query($db, $query);
    if($orphanedOrders != null){
        $numRecords = mysqli_num_rows($orphanedOrders);
        if($numRecords != 0){
            for($i=0; $i< $numRecords; $i++){
                $orphanedOrdersArray = 
                    mysqli_fetch_array($orphanedOrders, MYSQLI_ASSOC);
                $orphanedOrderID = $orphanedOrdersArray['order_id'];
                $query = "DELETE FROM my_Order
                          WHERE order_id = '$orphanedOrderID' and
                                order_status = 'IP' and
                                customer_id = '$customerID'";
                $success = mysqli_query($db, $query);

                if(!$success){
                    echo "DELETE failure of orphaned orders
                        in logoutProcess.";
                        exit(0);
                }
            }
        }

    }
}

mysqli_close($db);

?>
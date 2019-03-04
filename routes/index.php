<?php declare(strict_types=1);

use FrontEndDev\Controllers\IndexController;

$container = $app->getContainer();
$container['IndexController'] = function ($c) {
    $view = $c->get("view"); // retrieve the 'view' from the container
    return new IndexController($view);
};

$app->get('/', \IndexController::class . ':index')->setName('home');

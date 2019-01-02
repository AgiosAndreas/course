<?php namespace app;

interface VendingMachineInterface
{
    public function vend($code, $cash);
}

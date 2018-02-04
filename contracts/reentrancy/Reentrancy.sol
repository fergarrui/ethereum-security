pragma solidity ^0.4.0;

interface Reentrancy {
    function deposit() public payable;
    function withdrawAll() public;
}

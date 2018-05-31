pragma solidity ^0.4.23;

interface Reentrancy {
    function deposit() public payable;
    function withdrawAll() public;
}

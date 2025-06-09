"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import Center from "./Center";
import { CartContexts } from "./CartContext";
import Logo1 from "../public/Logo.svg"; // Adjust the path as necessary
import Image from "next/image";

const StyleHeader = styled.header`
  background-color: #222;
  color: white;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  color: white;
  text-decoration: none;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  color: #ccc;
  overflow: hidden; // Hide overflowing content when menu is closed

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    max-height: ${({ isOpen }) =>
      isOpen ? "400px" : "0"}; // Control height animation
    opacity: ${({ isOpen }) => (isOpen ? "1" : "0")}; // Fade in/out effect
    transform: ${({ isOpen }) =>
      isOpen ? "translateY(0)" : "translateY(-20px)"}; // Slide down/up effect
    transition: max-height 0.6s ease, opacity 0.4s ease, transform 0.4s ease; // Smooth animation for max-height, opacity, and transform
  }
`;

const NavLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #fff;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 0;
    width: 100%;
    text-align: left;
  }
`;
const ToggleButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.4s ease, opacity 0.4s ease;

  @media (max-width: 768px) {
    display: block;
  }

  span {
    display: inline-block;
    transition: transform 0.4s ease;
  }

  &.open span {
    transform: rotate(180deg); // Rotate icon when open
  }
`;

const Header = () => {
  const { cartProducts } = useContext(CartContexts);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <StyleHeader>
      <Center>
        <Wrapper>
          <ToggleButton onClick={toggleMenu} className={isOpen ? "open" : ""}>
            <span>{isOpen ? "✖" : "☰"}</span>
          </ToggleButton>
          <Logo href={"http://localhost:3000/"}>
            <Image src={Logo1} width={150} height={100} />
          </Logo>
          <Nav isOpen={isOpen}>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>Products</NavLink>
            <NavLink href={"/categories"}>Categories</NavLink>
            <NavLink href={"/account"}>Account</NavLink>
            <NavLink href={"/cart"}>Cart ({cartProducts?.length})</NavLink>
          </Nav>
        </Wrapper>
      </Center>
    </StyleHeader>
  );
};

export default Header;

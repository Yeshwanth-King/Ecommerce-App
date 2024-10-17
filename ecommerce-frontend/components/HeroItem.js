"use client";
import React, { useContext } from "react";
import Center from "./Center";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { CartContexts } from "./CartContext";

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 2rem 0;
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 3rem;
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Des = styled.p`
  font-size: 1rem;
  color: rgb(156 163 175);
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.8fr;
  gap: 50px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const Coloum = styled.div`
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 25px;

  @media (max-width: 768px) {
    height: auto;
    gap: 15px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 50vh;

  @media (max-width: 768px) {
    height: 30vh;
  }
`;

const HeroItem = ({ product }) => {
  const { addToCart } = useContext(CartContexts);

  const addFeaturedPro = (id) => {
    addToCart(id);
  };

  return (
    <Bg>
      <Center>
        <Wrapper>
          <ImageWrapper>
            <Link href={"/products/" + product._id}>
              <Image
                src={product.images[1]}
                fill
                alt="Picture of the Featured Product"
                priority
                style={{ objectFit: "cover" }}
              />
            </Link>
          </ImageWrapper>
          <Coloum>
            <div className="flex flex-col gap-5">
              <Title>{product.Name}</Title>
              <Des>{product.description}</Des>
            </div>
            <div className="flex gap-3">
              <Link
                href={"/products/" + product._id}
                className="hover:bg-white text-white hover:text-black border-2 transition-all duration-300 text-lg px-2 py-1 rounded-lg"
              >
                Read More
              </Link>
              <button
                onClick={() => addFeaturedPro(product._id)}
                className="flex justify-center gap-2 hover:text-white items-center bg-white text-black px-2 py-1 rounded-lg border-2 border-white hover:bg-gray-400 hover:border-gray-400 transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 w-7"
                >
                  <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                </svg>
                <span>Add To Cart</span>
              </button>
            </div>
          </Coloum>

        </Wrapper>
      </Center>
    </Bg>
  );
};

export default HeroItem;

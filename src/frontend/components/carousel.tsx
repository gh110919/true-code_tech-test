import { Carousel } from "react-bootstrap";
import { styled } from "styled-components";

type TProps = Partial<{
  images: { src: string; alt: string }[];
}>;

export const Carousel_ = (_props?: TProps) => {
  return (
    <Container>
      <Carousel>
        {_props?.images?.map((e, i) => {
          return (
            <Carousel.Item key={i}>
              <Image src={e.src} alt={e.alt} />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </Container>
  );
};

const Image = styled.img`
  ${(p) => (p.className = "Image")};
  display: flex;
  width: 18rem;
  height: 18rem;
  object-fit: cover;

`;

const Container = styled.section`
  display: flex;
`;

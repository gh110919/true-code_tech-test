import { styled } from "styled-components";
import { Catalog } from "../../frontend/components/catalog";

type TProps = Partial<{
  children: JSX.Element;
}>;

export const Index = (_props?: TProps) => {
  return (
    <Container>
      <Catalog></Catalog>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
`;

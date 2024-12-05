import { useState } from "react";
import { styled } from "styled-components";
import { TFiles } from "../../backend/assets/migrate";
import { api } from "../api/api";

type TProps = Partial<{
  children: JSX.Element;
}>;

export const UploadPhotos = (_props?: TProps) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e: any) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      /* загружаем фотки на бэк */
      await api
        .post("/upload", formData, {
          headers: { "content-type": "multipart/form-data" },
        })
        .then((r) => {
          if (r.data.success) {
            /* если успешно делаем записи в таблицу фоток */
            r.data.files.map((e: TFiles) => {
              api.post("/crud/photos", {
                src: e.url,
                alt: e.originalname,
              });
            });
          }
        });
      console.log("Success uploading files");
    } catch (error) {
      console.error("Error uploading files", error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input type="file" onChange={handleFileChange} multiple />
        <Button type="submit">Отправить</Button>
      </Form>
    </Container>
  );
};

const Button = styled.button`
  ${(p) => (p.className = "Button")};
  display: flex;
  outline: 1px solid red;
  padding: 4px;
`;

const Input = styled.input`
  ${(p) => (p.className = "Input")};
  display: flex;
`;

const Form = styled.form`
  ${(p) => (p.className = "Form")};
  display: flex;
  flex-direction: row-reverse;
  gap: 16px;
  align-items: center;
`;

const Container = styled.section`
  display: flex;
`;

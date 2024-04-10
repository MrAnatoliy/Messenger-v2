import Header from "../components/Header";
import { Box } from "@mui/material";
import IHeaderProps from "../interface/IHeaderProps";

const Page = ({ children }: any, props: IHeaderProps) => {
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          width: "100wv",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Header enableAuthButtons={props.enableAuthButtons} />
        {children}
      </Box>
    </>
  );
};

export default Page;

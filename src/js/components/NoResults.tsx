import { Alert, Box } from "@mui/material";

interface NoResultsProps {
  content: string;
}

const NoResults = ({ content }: NoResultsProps) => (
  <Box sx={{ textAlign: "center" }}>
    <Alert severity="error">{content}</Alert>
  </Box>
);

export default NoResults;

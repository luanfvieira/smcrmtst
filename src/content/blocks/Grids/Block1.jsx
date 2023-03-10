import { Box, Stack, Card, Typography, Divider } from "@mui/material";

import Text from "src/components/Text";
import PersonTwoToneIcon from "@mui/icons-material/PersonTwoTone";
import SubscriptionsTwoToneIcon from "@mui/icons-material/SubscriptionsTwoTone";
import MonetizationOnTwoToneIcon from "@mui/icons-material/MonetizationOnTwoTone";

function Block1() {
  return (
    <Card>
      <Stack
        direction="row"
        justifyContent="space-evenly"
        alignItems="stretch"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={0}
      >
        <Box
          p={2}
          sx={{
            textAlign: "center",
          }}
        >
          <Text color="warning">
            <MonetizationOnTwoToneIcon fontSize="large" />
          </Text>
          <Typography variant="h3">$9,658</Typography>
          <Typography variant="subtitle2">revenue</Typography>
        </Box>
        <Box
          p={2}
          sx={{
            textAlign: "center",
          }}
        >
          <Text color="success">
            <PersonTwoToneIcon fontSize="large" />
          </Text>
          <Typography variant="h3">23,594</Typography>
          <Typography variant="subtitle2">Users</Typography>
        </Box>
        <Box
          p={2}
          sx={{
            textAlign: "center",
          }}
        >
          <Text color="info">
            <SubscriptionsTwoToneIcon fontSize="large" />
          </Text>
          <Typography variant="h3">1,064</Typography>
          <Typography variant="subtitle2">orders</Typography>
        </Box>
      </Stack>
    </Card>
  );
}

export default Block1;

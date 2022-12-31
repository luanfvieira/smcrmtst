import {
  Avatar,
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Fragment } from "react";
import Scrollbar from "src/components/Scrollbar";

export default function ReportPerResponsible({ data }) {
  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
      }}
    >
      <CardHeader
        title="Tarefas por responsável"
        titleTypographyProps={{
          variant: "subtitle2",
          fontWeight: "bold",
        }}
      />
      <Divider />
      <Box
        sx={{
          height: 458,
        }}
      >
        <Scrollbar>
          <List disablePadding>
            {data.map((item, index) => {
              return (
                <Fragment key={index}>
                  <ListItem
                    component="div"
                    sx={{
                      py: 2,
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      width="100%"
                      justifyContent="space-between"
                      sx={{ p: 1 }}
                    >
                      <Box alignItems="center" display="flex">
                        <Box>
                          <ListItemAvatar>
                            <Avatar>{`${item.user
                              .charAt(0)
                              .toUpperCase()}${item.user.charAt(1)}`}</Avatar>
                          </ListItemAvatar>
                        </Box>

                        <Box>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold" }}
                          >
                            {item.user}
                          </Typography>
                        </Box>
                      </Box>

                      <Box display="flex" alignItems="center">
                        <Box
                          sx={{
                            mr: 3,
                            justifyContent: "flex-start",
                            display: "flex",
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold" }}
                          >
                            {" "}
                            Total de tarefas:
                          </Typography>
                        </Box>

                        <Box>
                          <Typography variant="h4">
                            {item.data.AMOUNT}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Box
                      display="flex"
                      alignItems="center"
                      width="100%"
                      justifyContent="space-between"
                      sx={{ p: 1 }}
                    >
                      <Box display="flex" alignItems="center">
                        <Box
                          sx={{
                            mr: 3,
                            justifyContent: "flex-start",
                            display: "flex",
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold" }}
                          >
                            Pendente:
                          </Typography>
                        </Box>
                        <Box>
                          <Typography>{item.data["PENDENTE"] || 0}</Typography>
                        </Box>
                      </Box>

                      <Box display="flex" alignItems="center">
                        <Box
                          sx={{
                            mr: 3,
                            justifyContent: "flex-start",
                            display: "flex",
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold" }}
                          >
                            Em Andamento:
                          </Typography>
                        </Box>
                        <Box>
                          <Typography>
                            {item.data["EM ANDAMENTO"] || 0}
                          </Typography>
                        </Box>
                      </Box>

                      <Box display="flex" alignItems="center">
                        <Box
                          sx={{
                            mr: 3,
                            justifyContent: "flex-start",
                            display: "flex",
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold" }}
                          >
                            Finalizadas:
                          </Typography>
                        </Box>
                        <Box>
                          <Typography>
                            {item.data["FINALIZADO"] || 0}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </ListItem>
                  <Divider />
                </Fragment>
              );
            })}
          </List>
        </Scrollbar>
      </Box>
    </Card>
  );
}

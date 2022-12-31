import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import Scrollbar from "src/components/Scrollbar";

export default function GeneralTaskReport({ data }) {
  //   console.log(data);
  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardHeader
        title="Tarefas"
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
            {data.length === 0 ? (
              <Box
                sx={{
                  p: 2,
                  justifyContent: "center",
                  alignContent: "center",
                  display: "flex",
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  Não há tarefas com o status selecionado...
                </Typography>
              </Box>
            ) : (
              ""
            )}
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
                          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                            {item.title}
                          </Typography>
                        </Box>
                      </Box>

                      <Box display="flex" alignItems="center">
                        <Box
                          sx={{
                            mr: 1,
                            justifyContent: "flex-start",
                            display: "flex",
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold" }}
                          >
                            Status:
                          </Typography>
                        </Box>

                        <Box>
                          <Typography variant="h4">
                            {item.tasksTypesStatusId}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Box
                      display="flex"
                      alignItems="center"
                      width="100%"
                      justifyContent="space-between"
                      sx={{ p: 0.5 }}
                    >
                      {item.usersToExecute.map((user) => (
                        <Box display="flex" alignItems="center" key={user.id}>
                          <Box
                            sx={{
                              justifyContent: "flex-start",
                              display: "flex",
                              alignContent: "center",
                            }}
                          >
                            <ListItemAvatar>
                              <Avatar>{`${user.user
                                .charAt(0)
                                .toUpperCase()}${user.user.charAt(1)}`}</Avatar>
                            </ListItemAvatar>
                          </Box>

                          <Box>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: "bold" }}
                            >
                              {user.user}
                            </Typography>
                          </Box>
                        </Box>
                      ))}

                      <Box display="flex" alignItems="center">
                        <Box
                          sx={{
                            mr: 1,
                            justifyContent: "flex-start",
                            display: "flex",
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold" }}
                          >
                            Prioridade:
                          </Typography>
                        </Box>

                        <Box>
                          <Typography variant="h4">
                            {item.tasksPrioritiesId}
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

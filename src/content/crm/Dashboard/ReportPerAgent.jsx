import {
  Box,
  Card,
  Typography,
  ListItemText,
  ListItem,
  Avatar,
  List,
  ListItemAvatar,
  Divider,
  useTheme,
  CardHeader,
  LinearProgress,
  styled,
  linearProgressClasses,
  alpha,
  Grid,
} from "@mui/material";

import Scrollbar from "src/components/Scrollbar";
import { Fragment } from "react";
import { ReportPerStatusDetails } from "./ReportPerStatusDetails";

const LinearProgressPrimary = styled(LinearProgress)(
  ({ theme }) => `
        height: 8px;
        border-radius: ${theme.general.borderRadiusLg};

        &.${linearProgressClasses.colorPrimary} {
            background-color: ${alpha(theme.colors.success.main, 0.1)};
            box-shadow: inset 0 1px 2px ${alpha(
              theme.colors.success.dark,
              0.2
            )};
        }
        
        & .${linearProgressClasses.bar} {
            border-radius: ${theme.general.borderRadiusLg};
            background-color: ${theme.colors.success.main};
        }
    `
);

export function ReportPerAgent({ data }) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: "100%",
      }}
    >
      <CardHeader title="Negociação por Representante" />
      <Divider />
      <Box
        sx={{
          height: 458,
        }}
      >
        <Scrollbar>
          <List disablePadding>
            {Object.keys(data)?.map((item, index) => {
              return (
                <Fragment key={item}>
                  <ListItem
                    component="div"
                    sx={{
                      py: 2,
                      flexDirection: "column",
                    }}
                  >
                    {" "}
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="end"
                      width="100%"
                      sx={{ marginBottom: 2 }}
                    >
                      <ReportPerStatusDetails
                        details={
                          Object.values(data).filter(
                            (_, ind) => ind === index
                          )?.[0]?.[3]?.info
                        }
                        type={item}
                      />
                    </Box>
                    <Box display="flex" alignItems="center" width="100%">
                      <ListItemAvatar
                        sx={{
                          minWidth: "36px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Avatar
                          sx={{
                            background: `${theme.colors.shadows.primary}`,
                            color: `${theme.palette.getContrastText(
                              theme.colors.info.dark
                            )}`,
                            width: 44,
                            height: 44,
                          }}
                        >
                          {`${item.split("")[0].charAt(0)}${item
                            .split("")[1]
                            .charAt(0)}`}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item}
                        primaryTypographyProps={{
                          variant: "h5",
                          color: "textPrimary",
                          ml: 0.5,
                          noWrap: true,
                        }}
                      />
                      <Box display="flex" alignItems="center">
                        <Box
                          sx={{
                            mr: 3,
                          }}
                        >
                          <Typography
                            align="right"
                            variant="subtitle2"
                            noWrap
                            gutterBottom
                          >
                            {
                              Object.values(data).filter(
                                (_, ind) => ind === index
                              )?.[0]?.[0]?.tag
                            }
                          </Typography>
                          <Typography align="right" variant="h5">
                            {
                              Object.values(data).filter(
                                (_, ind) => ind === index
                              )?.[0]?.[0]?.qtd
                            }
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            align="right"
                            variant="subtitle2"
                            noWrap
                            gutterBottom
                          >
                            {
                              Object.values(data).filter(
                                (_, ind) => ind === index
                              )?.[0]?.[1]?.tag
                            }
                          </Typography>
                          <Typography align="right" variant="h5">
                            {
                              Object.values(data).filter(
                                (_, ind) => ind === index
                              )?.[0]?.[1]?.qtd
                            }
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <Box
                          display="flex"
                          sx={{
                            mt: 1.5,
                          }}
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Typography variant="h5" fontWeight="normal">
                            Sucesso em negociações
                          </Typography>
                          <Typography
                            sx={{
                              color: `${theme.colors.success.main}`,
                            }}
                            variant="h4"
                          >
                            {Number(
                              Object.values(data).filter(
                                (_, ind) => ind === index
                              )?.[0]?.[2]?.qtd
                            )}
                            %
                          </Typography>
                        </Box>
                        <LinearProgressPrimary
                          variant="determinate"
                          value={Math.round(
                            Number(
                              Object.values(data).filter(
                                (_, ind) => ind === index
                              )?.[0]?.[2]?.qtd
                            )
                          )}
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                  <Divider />
                </Fragment>
              );
            })}
          </List>
        </Scrollbar>
      </Box>
      <Divider />
      <Box
        p={2}
        sx={{
          textAlign: "center",
        }}
      >
        {/* <Button
          sx={{
            textTransform: "uppercase",
            fontSize: `${theme.typography.pxToRem(12)}`,
          }}
          variant="contained"
          endIcon={<KeyboardArrowRightTwoToneIcon />}
        >
          View all transactions
        </Button> */}
      </Box>
    </Card>
  );
}

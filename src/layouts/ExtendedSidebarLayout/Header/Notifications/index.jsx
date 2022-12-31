import { useRef, useState } from "react";

import {
  alpha,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  Tab,
  Tabs,
  Popover,
  useTheme,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Scrollbar from "src/components/Scrollbar";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Text from "src/components/Text";

import NotificationsActiveTwoToneIcon from "@mui/icons-material/NotificationsActiveTwoTone";

import PageviewIconIcon from "@mui/icons-material/Pageview";

import { useMutation, useQueryClient } from "react-query";
import notificationsApi from "src/utils/notificationsApi";
import { formatDate } from "src/utils/formatDate";

const BoxComposed = styled(Box)(
  () => `
  position: relative;
`
);

const BoxComposedContent = styled(Box)(
  ({ theme }) => `
  position: relative;
  z-index: 7;

  .MuiTypography-root {
      color: ${theme.palette.primary.contrastText};

      & + .MuiTypography-root {
          color: ${alpha(theme.palette.primary.contrastText, 0.7)};
      }
  }
  
`
);

const BoxComposedBg = styled(Box)(
  () => `
  position: absolute;
  left: 0;
  top: 0;
  z-index: 6;
  height: 100%;
  width: 100%;
  border-radius: inherit;
`
);

const TabsWrapper = styled(Tabs)(
  ({ theme }) => `
      overflow: visible !important;

      .MuiTabs-scroller {
          overflow: visible !important;
      }

      .MuiButtonBase-root {
          text-transform: uppercase;
          font-size: ${theme.typography.pxToRem(12)};

          &:last-child {
            margin-right: 0;
          }
      }
  `
);

const IconButtonWrapper = styled(IconButton)(
  ({ theme }) => `
  width: ${theme.spacing(4)};
  height: ${theme.spacing(4)};
  border-radius: ${theme.general.borderRadiusLg};
`
);

function HeaderNotifications() {
  const queryClient = useQueryClient();

  const data = [];

  // const { data /*isError*/ } = useQuery(
  //   "notifications",
  //   async () => {
  //     const response = await notificationsApi.get("/info/notifications");

  //     return response.data;
  //   },
  //   { refetchOnWindowFocus: false, refetchInterval: 1000 * 30 }
  // );

  const { mutateAsync: readNotification } = useMutation(
    async (notificationId) => {
      const response = await notificationsApi.patch(
        `/info/notifications/${notificationId}`
      );

      return response.data;
    },
    {
      onSuccess: (data) => {
        // queryClient.invalidateQueries(["notifications"]);
        queryClient.setQueryData(["notifications"], (notifications) => {
          return notifications.notifications
            .filter(
              (notificationUpdate) =>
                notificationUpdate.id !== data.notificationId
            )
            .map((item) => {
              return item;
            });
        });
      },
    }
  );

  // console.log({ data, isError });

  const countNotificationsNotsRead =
    data?.notifications?.filter((item) => !item.readAt)?.length ?? 0;

  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const theme = useTheme();

  const [currentTab, setCurrentTab] = useState("not_read");

  const tabs = [
    { value: "not_read", label: "Não lidas" },
    { value: "read", label: "Todas" },
  ];

  const handleTabsChange = (_event, value) => {
    setCurrentTab(value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentTab("not_read");
    setOpen(false);
  };

  return (
    <>
      <Tooltip arrow title="Notificação">
        <Badge
          variant="dot"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{
            ".MuiBadge-badge": {
              background:
                countNotificationsNotsRead > 0 ? theme.colors.success.main : "",
              animation: "pulse 1s infinite",
              transition: `${theme.transitions.create(["all"])}`,
            },
          }}
        >
          <IconButtonWrapper
            sx={{
              background: alpha(theme.colors.primary.main, 0.1),
              transition: `${theme.transitions.create(["background"])}`,
              color: theme.colors.primary.main,

              "&:hover": {
                background: alpha(theme.colors.primary.main, 0.2),
              },
            }}
            color="primary"
            ref={ref}
            onClick={handleOpen}
          >
            <NotificationsActiveTwoToneIcon fontSize="small" />
          </IconButtonWrapper>
        </Badge>
      </Tooltip>
      <Popover
        disableScrollLock
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box minWidth={440} maxWidth={440} p={2}>
          <BoxComposed
            mb={2}
            sx={{
              borderRadius: `${theme.general.borderRadius}`,
              background: `${theme.colors.gradients.black1}`,
            }}
          >
            <BoxComposedBg
              sx={{
                opacity: 0.3,
                background: `${theme.colors.gradients.blue2}`,
              }}
            />

            <BoxComposedContent py={3}>
              <Typography
                textAlign="center"
                sx={{
                  pb: 0.5,
                }}
                variant="h4"
              >
                Notificações
              </Typography>
              <Typography textAlign="center" variant="subtitle2">
                Você tem{" "}
                <Text color="success">
                  <b>{countNotificationsNotsRead}</b>
                </Text>{" "}
                novas notificações não lidas.
              </Typography>
            </BoxComposedContent>
          </BoxComposed>
          <TabsWrapper
            centered
            onChange={handleTabsChange}
            value={currentTab}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
          >
            {tabs.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </TabsWrapper>
        </Box>
        <Divider />
        {currentTab === "not_read" && (
          <Box
            sx={{
              height: 220,
            }}
          >
            <Scrollbar>
              {countNotificationsNotsRead > 0 ? (
                <Timeline
                  sx={{
                    px: 2,
                    py: 1,
                    m: 2,
                  }}
                >
                  {data &&
                    data?.notifications
                      ?.filter((item) => !item.readAt)
                      .map((notification) => {
                        return (
                          <TimelineItem
                            key={notification.id}
                            sx={{
                              p: 0,
                            }}
                          >
                            <TimelineSeparator
                              sx={{
                                position: "relative",
                              }}
                            >
                              <TimelineDot
                                sx={{
                                  marginTop: 0,
                                  top: theme.spacing(1.2),
                                }}
                                variant="outlined"
                                color="success"
                              />
                              <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent
                              sx={{
                                pl: 3,
                                pb: 4,
                              }}
                            >
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {formatDate(notification?.createdAt)}
                              </Typography>
                              <Typography variant="h5" gutterBottom>
                                {notification?.content?.message}
                              </Typography>
                              <Box
                                display="flex"
                                mt={1}
                                alignItems="flex-start"
                              >
                                <Button
                                  size="small"
                                  variant="contained"
                                  onClick={async () => {
                                    handleClose();
                                    await readNotification(notification.id);
                                    // await api.patch(
                                    //   `/info/notifications/${notification.id}`
                                    // );
                                  }}
                                  component={RouterLink}
                                  to={`/app/crm/indicate/${notification?.content?.id}/details`}
                                  startIcon={<PageviewIconIcon />}
                                >
                                  Visualizar
                                </Button>
                              </Box>
                            </TimelineContent>
                          </TimelineItem>
                        );
                      })}
                </Timeline>
              ) : (
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    m: 2,
                  }}
                >
                  <Typography color="text.primary" variant="h5" noWrap>
                    Não há notificações não lidas!
                  </Typography>
                </Box>
              )}
            </Scrollbar>
          </Box>
        )}
        {currentTab === "read" && (
          <Box
            sx={{
              height: 220,
            }}
          >
            <Scrollbar>
              <Timeline
                sx={{
                  px: 2,
                  py: 1,
                  m: 2,
                }}
              >
                {data &&
                  data?.notifications
                    ?.filter((item) => item.readAt)
                    .map((notification) => {
                      return (
                        <TimelineItem
                          key={notification.id}
                          sx={{
                            p: 0,
                          }}
                        >
                          <TimelineSeparator
                            sx={{
                              position: "relative",
                            }}
                          >
                            <TimelineDot
                              sx={{
                                marginTop: 0,
                                top: theme.spacing(1.2),
                              }}
                              variant="outlined"
                              color="error"
                            />
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent
                            sx={{
                              pl: 3,
                              pb: 4,
                            }}
                          >
                            <Typography variant="body2" color="text.secondary">
                              {formatDate(notification?.createdAt)}
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                              {notification?.content?.message}
                            </Typography>
                            <Box display="flex" mt={1} alignItems="flex-start">
                              <Button
                                size="small"
                                variant="contained"
                                onClick={() => {
                                  handleClose();
                                }}
                                component={RouterLink}
                                to={`/app/crm/indicate/${notification?.content?.id}/details`}
                                startIcon={<PageviewIconIcon />}
                              >
                                Visualizar
                              </Button>
                            </Box>
                          </TimelineContent>
                        </TimelineItem>
                      );
                    })}
              </Timeline>
            </Scrollbar>
          </Box>
        )}

        <Divider />
        <Box
          p={2}
          sx={{
            textAlign: "center",
          }}
        >
          {/* <Button
            sx={{
              px: 2,
              py: 0.5,
              fontWeight: "normal",
              borderRadius: 10,
              background: "transparent",
              color: `${theme.colors.primary.main}`,
              border: `${theme.colors.primary.main} solid 2px`,
              transition: `${theme.transitions.create(["all"])}`,

              ".MuiSvgIcon-root": {
                color: `${theme.colors.primary.main}`,
                transition: `${theme.transitions.create(["color"])}`,
              },

              "&:hover": {
                px: 3,
                background: `${theme.colors.primary.main}`,
                color: `${theme.palette.getContrastText(
                  theme.colors.primary.dark
                )}`,
                boxShadow: `${theme.colors.shadows.primary}`,

                ".MuiSvgIcon-root": {
                  color: `${theme.palette.getContrastText(
                    theme.colors.primary.dark
                  )}`,
                },
              },
              "&:active": {
                boxShadow: "none",
              },
            }}
            variant="contained"
            endIcon={<ArrowForwardTwoToneIcon />}
            color="primary"
          >
            View all
          </Button> */}
        </Box>
      </Popover>
    </>
  );
}

export default HeaderNotifications;

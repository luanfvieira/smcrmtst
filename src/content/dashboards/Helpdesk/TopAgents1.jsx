import {
  Card,
  Box,
  Typography,
  Avatar,
  Divider,
  Grid,
  LinearProgress,
  styled,
  useTheme,
} from "@mui/material";
import WorkTwoToneIcon from "@mui/icons-material/WorkTwoTone";

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
`
);

const DotLegend = styled("span")(
  ({ theme }) => `
    border-radius: 22px;
    width: ${theme.spacing(1.5)};
    height: ${theme.spacing(1.5)};
    display: inline-block;
    margin-right: ${theme.spacing(0.5)};
`
);

const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(5)};
      height: ${theme.spacing(5)};
`
);

const LinearProgressWrapper = styled(LinearProgress)(
  ({ theme }) => `
        flex-grow: 1;
        height: 8px;
        width: 80%;
        margin-top: ${theme.spacing(0.5)}; 
        
        &.MuiLinearProgress-root {
          background-color: ${theme.colors.alpha.black[10]};
        }
        
        .MuiLinearProgress-bar {
          border-radius: ${theme.general.borderRadiusXl};
        }
`
);

function TopAgents1() {
  const theme = useTheme();

  return (
    <Card>
      <Box
        sx={{
          p: 4,
        }}
      >
        <AvatarWrapper
          sx={{
            mb: 2,
          }}
          variant="rounded"
          src="/static/images/avatars/5.jpg"
        />
        <Typography variant="h3">Maren Lipshutz</Typography>
        <Typography variant="subtitle2" gutterBottom>
          eCommerce Senior Team
        </Typography>

        <Typography
          variant="body1"
          sx={{
            pt: 0.5,
            display: "flex",
            alignItems: "center",
          }}
        >
          <DotLegend style={{ background: theme.colors.error.main }} />
          Online
          <Typography variant="body1" color="text.secondary" component="span">
            &nbsp; - 3:53
          </Typography>
        </Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          p: 4,
        }}
      >
        <Grid spacing={3} container>
          <Grid item sm={6}>
            <Typography
              variant="caption"
              sx={{
                pb: 1,
              }}
              component="div"
            >
              Capacity
            </Typography>
            <Box>
              <Typography
                color="text.primary"
                variant="h2"
                sx={{
                  pr: 0.5,
                  display: "inline-flex",
                }}
              >
                3
              </Typography>
              <Typography
                color="text.secondary"
                variant="h4"
                sx={{
                  pr: 2,
                  display: "inline-flex",
                }}
              >
                /10
              </Typography>
              <LinearProgressWrapper
                value={30}
                color="primary"
                variant="determinate"
              />
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Typography
              variant="caption"
              sx={{
                pb: 1.5,
              }}
              component="div"
            >
              Productivity
            </Typography>
            <Box display="flex" alignItems="center">
              <AvatarPrimary>
                <WorkTwoToneIcon />
              </AvatarPrimary>
              <Typography
                variant="h3"
                sx={{
                  pl: 1,
                }}
                component="div"
              >
                83%
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

export default TopAgents1;

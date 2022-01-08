import { Button, makeStyles } from "@material-ui/core";
import { useEthers } from "@usedapp/core";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
    display: "flex",
    justifyContent: "flex-end",
    gap: theme.spacing(1),
  },
  subContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing(1),
  },
  accountInfo: {
    backgroundColor: theme.palette.grey[700],
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    overflow: "hidden",
    textOverFlow: "ellipsis",
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.grey[800],
    },
  },
}));

export const Header = () => {
  const { account, activateBrowserWallet, deactivate } = useEthers();
  const classes = useStyles();

  const isConnected = account !== undefined;

  return (
    <div className={classes.container}>
      {isConnected ? (
        <div className={classes.subContainer}>
          <Button className={classes.accountInfo} variant="contained">
            {account}
          </Button>
          <Button color="primary" variant="contained" onClick={deactivate}>
            Disconnect
          </Button>
        </div>
      ) : (
        <Button
          color="primary"
          variant="contained"
          onClick={() => activateBrowserWallet()}
        >
          Connect
        </Button>
      )}
    </div>
  );
};

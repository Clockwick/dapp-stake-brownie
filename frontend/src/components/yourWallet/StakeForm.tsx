import React, { useState, useEffect } from "react";
import { Token } from "../Main";
import { useNotifications } from "@usedapp/core";
import {
  Button,
  Input,
  CircularProgress,
  Snackbar,
  makeStyles,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useStakeTokens } from "../../hooks";
import { utils } from "ethers";

export interface StakeFormProps {
  token: Token;
}

const useStyles = makeStyles((theme) => ({
  errorMsg: {
    color: theme.palette.error.main,
    fontWeight: "bold",
  },
}));

export const StakeForm = ({ token }: StakeFormProps) => {
  const { address: tokenAddress } = token;
  const { notifications } = useNotifications();
  const classes = useStyles();
  const [amount, setAmount] = useState<
    number | string | Array<number | string>
  >(0);
  const [stakingError, setStakingError] = useState<boolean>(false);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount =
      event.target.value === "" ? "" : Number(event.target.value);
    setAmount(newAmount);
    console.log(newAmount);
  };

  const { approveAndStake, state: approveAndStakeErc20State } =
    useStakeTokens(tokenAddress);
  const handleStakeSubmit = () => {
    if (/[+-]?([0-9]*[.])?[0-9]+/.test(amount.toString()) && amount > 0) {
      const amountAsWei = utils.parseEther(amount.toString());
      setStakingError(false);
      return approveAndStake(amountAsWei.toString());
    }
    setStakingError(true);
  };

  const isMining = approveAndStakeErc20State.status === "Mining";
  const [showErc20ApprovalSuccess, setShowErc20ApprovalSuccess] =
    useState(false);
  const [showStakeTokenSuccess, setShowStakeTokenSuccess] = useState(false);
  const handleCloseSnack = () => {
    setShowErc20ApprovalSuccess(false);
    setShowStakeTokenSuccess(false);
  };

  useEffect(() => {
    if (
      notifications.filter(
        (notification) =>
          notification.type === "transactionSucceed" &&
          notification.transactionName === "Approve ERC20 transfer"
      ).length > 0
    ) {
      setShowErc20ApprovalSuccess(true);
      setShowStakeTokenSuccess(false);
      setStakingError(false);
    }
    if (
      notifications.filter(
        (notification) =>
          notification.type === "transactionSucceed" &&
          notification.transactionName === "Stake Tokens"
      ).length > 0
    ) {
      setShowErc20ApprovalSuccess(false);
      setShowStakeTokenSuccess(true);
      setStakingError(false);
    }
  }, [notifications, showErc20ApprovalSuccess, showStakeTokenSuccess]);

  return (
    <>
      <div>
        <Input onChange={handleInputChange} />
        <Button
          onClick={handleStakeSubmit}
          color="primary"
          size="large"
          disabled={isMining}
        >
          {isMining ? <CircularProgress size={26} /> : "Stake"}
        </Button>
      </div>
      {stakingError ? (
        <div className={classes.errorMsg}>Error, Please Try Again.</div>
      ) : null}
      <Snackbar
        open={showErc20ApprovalSuccess}
        autoHideDuration={5000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          ERC-20 token transfer approved! Now approve the 2nd transaction.
        </Alert>
      </Snackbar>
      <Snackbar
        open={showStakeTokenSuccess}
        autoHideDuration={5000}
        onClose={handleCloseSnack}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          Tokens Staked!
        </Alert>
      </Snackbar>
    </>
  );
};

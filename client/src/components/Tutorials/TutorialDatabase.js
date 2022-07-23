import { Container, Typography } from "@mui/material";
import React from "react";
import TutorialBar from "../reusable/TutorialBar";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../HomePageComponents/Sections/productStyle";
import GridContainer from "../HomePageComponents/GridContainer";
import GridItem from "../HomePageComponents/GridItem";
import classNames from "classnames";
import { container } from "../HomePageComponents/extra_components/material-kit-react";

const useStyles = makeStyles(styles);

const TutorialDatabase = (props) => {
  const { setTheme } = props;
  const classes = useStyles();

  const [user, setUser] = React.useState(null);
  const [selectedTab, setSelectedTab] = React.useState(0);
  return (
    <div>
      <TutorialBar barTitle={`Tutorial`} setTheme={setTheme} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}></div>
        <div className={classes.section}>
          <GridContainer justify="center">
            <GridItem md={8} align="left">
              <h1 className={classes.title}>Database</h1>
              <h3 className={classes.description}>
                Data is stored on a MySQL instance (and can alternatively be
                stored on any SQL database instance). Developing the database
                required close work with other developers and has evolved into
                three tables: user, simulation, and a personalized blocks table
                for each user.
              </h3>
              <h2 className={classes.title}>User Table</h2>
              <h3 className={classes.description}>
                The user table is very simple, containing only three fields. It
                contains an email as the primary key, a password, which is used
                to authenticate the user, and lastly a role, which can be used
                to implement different privileges. For example, you may want an
                ‘administrator’ role with read and write privileges to all
                simulations, an ‘instructor’ role with permissions to create
                simulations, and a ‘student’ role with permissions to read and
                edit simulations. While these roles have not been configured,
                the field exists to account for these types of configurations.
              </h3>
              <h2 className={classes.title}>Simulation Table</h2>
              <h3 className={classes.description}>
                The simulation table contains all of the information used to
                create a simulation. The primary key is an auto-incrementing
                simulation id, sim_id. It contains an email field, which
                specifies the owner of the simulation. The metadata of the
                simulation includes: the simulation name (sim_name), who the
                simulation is shared with (sim_shared), the simulation
                description (sim_description), the time the simulation was
                created (sim_created), the time the simulation was last modified
                (sim_modified), all of the hashes pertaining to the blocks
                contained in that simulation (sim_blocks), the amount of
                currency given to a miner when they successfully mine a block
                (subsidy), the number of blocks that must be mined for the
                subsidy to split in half (halvings), the maximum number of
                transactions in each block (numtransactions), the usernames of
                all the miners in the simulation (miningPool), the wallet
                information for each user in the simulation (wallets), the
                average time passed between the mining of each block (blockwin),
                and lastly, the list of unspent transaction outputs (utxoPool).
                Note: The sim_blocks field contains an array with all of the
                blocks in simulation. Using this field in conjunction with the
                email field, you are able to pull all of the blocks contained in
                the simulation by querying the user block table.
              </h3>
              <h2 className={classes.title}>User Block Table</h2>
              <h3 className={classes.description}>
                Lastly, the user block table contains all the blocks from all of
                the simulations each user has created and the metadata of those
                blocks. The primary key is hash. Hash uniquely identifies each
                block. The header field contains all the block header
                information, the transactions of each block are stored in the
                transaction field, the miner field describes the user in the
                simulation that is credited with mining the block, and lastly
                the time_created field shows the time that the block was
                created.
              </h3>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
};
export default TutorialDatabase;

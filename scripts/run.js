const hre = require("hardhat");

const main = async () => {
  // deploy contract locally
  const rsvpContractFactory = await hre.ethers.getContractFactory("Web3RSVP");
  const rsvpContract = await rsvpContractFactory.deploy();
  await rsvpContract.deployed();
  console.log("Contract deployed to:", rsvpContract.address);

  // initialize addresses to interact with the contract
  const [deployer, address1, address2] = await hre.ethers.getSigners();

  // test 1 - create a new event with mock event data
  let deposit = hre.ethers.utils.parseEther("1");
  let maxCapacity = 3;
  let timestamp = 1718926200;
  let eventDataCID =
    "bafybeibhwfzx6oo5rymsxmkdxpmkfwyvbjrrwcl7cekmbzlupmp5ypkyfi";

  // create a new event by calling the createNewEvent() function and passing the mock parameters
  let txn = await rsvpContract.createNewEvent(
    timestamp,
    deposit,
    maxCapacity,
    eventDataCID
  );
  // log the emitted events and other data
  let wait = await txn.wait();
  console.log("NEW EVENT CREATED:", wait.events[0].event, wait.events[0].args);

  // log the new event ID created
  let eventID = wait.events[0].args.eventID;
  console.log("EVENT ID:", eventID);

  // call createNewRSVP() function to RSVP with the 3 accounts we initialized
  // use the .connect(address) modifier to call the function from an address different than deployer(default)
  // Use the deposit variable to pass in the value to send
  //log the emitted events too
  txn = await rsvpContract.createNewRSVP(eventID, { value: deposit });
  wait = await txn.wait();
  console.log("NEW RSVP:", wait.events[0].event, wait.events[0].args);

  txn = await rsvpContract
    .connect(address1)
    .createNewRSVP(eventID, { value: deposit });
  wait = await txn.wait();
  console.log("NEW RSVP:", wait.events[0].event, wait.events[0].args);

  txn = await rsvpContract
    .connect(address2)
    .createNewRSVP(eventID, { value: deposit });
  wait = await txn.wait();
  console.log("NEW RSVP:", wait.events[0].event, wait.events[0].args);

  // confirm all of the RSVP by calling the confirmAllAttendees() function
  // this will be called from the deployer address since the event was created from that one
  txn = await rsvpContract.confirmAllAttendees(eventID);
  wait = await txn.wait();
  wait.events.forEach((event) =>
    console.log("CONFIRMED:", event.args.attendeeAddress)
  );

  // we can withdraw the funds only 7 days after the event
  // this section simulates the passing of 8 days
  await hre.network.provider.send("evm_increaseTime", [15778800000000]);

  // call withdrawUnclaimedDeposits() function after 8 days and log the event
  txn = await rsvpContract.withdrawUnclaimedDeposits(eventID);
  wait = await txn.wait();
  console.log("WITHDRAWN:", wait.events[0].event, wait.events[0].args);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();

export async function getStakingStatus(address: string) {
  const stake = await contract.methods.stakes(address).call();
  const lock = await contract.methods.lockTime(address).call();
  return { stake, lock };
}

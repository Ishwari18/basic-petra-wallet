// Function to check if Petra is installed
const getAptosWallet = () => {
    if ('aptos' in window) {
      return window.aptos;
    } else {
      window.open('https://petra.app/', '_blank');
    }
  };
  
  // Function to connect to Petra
  const connectToPetra = async () => {
    const wallet = getAptosWallet();
  
    try {
      // Connect to Petra
      const response = await wallet.connect();
      console.log(response); // { address: string, publicKey: string }
  
      // Get account information
      const account = await wallet.account();
      console.log(account); // { address: string, publicKey: string }
  
      // Do something with the connected wallet, e.g., update UI
      alert(`Connected to Petra! Address: ${account.address}`);
    } catch (error) {
      // Handle errors
      console.error(error);
      alert('Failed to connect to Petra. Please try again.');
    }
  };
  
  // Function to disconnect from Petra
  const disconnectFromPetra = async () => {
    const wallet = getAptosWallet();
  
    try {
      // Disconnect from Petra
      await wallet.disconnect();
      alert('Disconnected from Petra.');
  
      // Optionally, update UI to reflect disconnected state
    } catch (error) {
      // Handle errors
      console.error(error);
      alert('Failed to disconnect from Petra. Please try again.');
    }
  };
  
  // Event listener for the Connect Wallet button
  document.getElementById('connectWalletBtn').addEventListener('click', connectToPetra);
  
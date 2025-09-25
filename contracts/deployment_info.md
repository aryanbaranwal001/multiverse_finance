# Prediction Market Contract Deployment Information

## Contract Details
- **Contract Name**: AI Jobs Market Prediction Contract
- **Network**: Aptos Testnet
- **Module**: `prediction_market::ai_jobs_market`

## Deployment Information
- **Admin Account**: `0x8b421ba847e4a8bb1726290fe9928f19290225fb1424f8b18f70116b61138343`
- **Contract Publish Transaction**: `0x586bad1845bbd20428a6a49469cf871da7bb9204b43ba46dd3d01acde166160a`
- **Market Initialize Transaction**: `0xcc39cfdbc270c449e94d68fb8957e70077aa9ebf860b53d534275376b15a718f`
- **Test Purchase Transaction**: `0x2a9a53249250b23ac5d4566f22a439a3638f535e57d9b614fd99fa17765eef3c`

## Explorer Links
- **Contract**: https://explorer.aptoslabs.com/account/0x8b421ba847e4a8bb1726290fe9928f19290225fb1424f8b18f70116b61138343?network=testnet
- **Publish Transaction**: https://explorer.aptoslabs.com/txn/0x586bad1845bbd20428a6a49469cf871da7bb9204b43ba46dd3d01acde166160a?network=testnet
- **Initialize Transaction**: https://explorer.aptoslabs.com/txn/0xcc39cfdbc270c449e94d68fb8957e70077aa9ebf860b53d534275376b15a718f?network=testnet
- **Test Purchase**: https://explorer.aptoslabs.com/txn/0x2a9a53249250b23ac5d4566f22a439a3638f535e57d9b614fd99fa17765eef3c?network=testnet

## Token Information
- **YES Token**: AI Jobs Loss YES Token (AIJL-YES)
- **NO Token**: AI Jobs Loss NO Token (AIJL-NO)
- **Decimals**: 8
- **YES Price**: 62 cents ($0.62)
- **NO Price**: 38 cents ($0.38)
- **APT to USD Rate**: $12.00 per APT (hardcoded)

## Contract Functions
1. `initialize_market(admin: &signer)` - Initialize the prediction market
2. `buy_yes_tokens(buyer: &signer, market_address: address, apt_amount: u64)` - Buy YES tokens with APT
3. `buy_no_tokens(buyer: &signer, market_address: address, apt_amount: u64)` - Buy NO tokens with APT
4. `get_market_info(market_address: address)` - View market information
5. `calculate_tokens_for_apt(apt_amount: u64, is_yes_token: bool, market_address: address)` - Calculate token amount for APT

## How to Use
1. First, call `initialize_market` with the admin account to set up the market
2. Users can then call `buy_yes_tokens` or `buy_no_tokens` to purchase prediction tokens
3. The contract automatically calculates the number of tokens based on hardcoded prices matching the frontend

## Market Question
"Will AI cause more job losses than job creation in 2025?"
- Matches frontend market ID: "1"
- YES percentage: 62%
- NO percentage: 38%

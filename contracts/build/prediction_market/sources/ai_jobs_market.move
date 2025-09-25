module prediction_market::ai_jobs_market {
    use std::signer;
    use std::string::{Self, String};
    use std::option;
    use aptos_framework::fungible_asset::{Self, Metadata, FungibleStore};
    use aptos_framework::object::{Self, Object};
    use aptos_framework::primary_fungible_store;
    use aptos_framework::timestamp;

    // Error codes
    /// Market not found
    const ENOT_FOUND: u64 = 1;
    /// Not authorized
    const ENOT_AUTHORIZED: u64 = 2;
    /// Insufficient balance
    const EINSUFFICIENT_BALANCE: u64 = 3;
    /// Invalid amount
    const EINVALID_AMOUNT: u64 = 4;
    /// Market already exists
    const EMARKET_EXISTS: u64 = 5;

    // Market constants - matching frontend data for "Will AI cause more job losses than job creation in 2025?"
    const YES_TOKEN_NAME: vector<u8> = b"AI Jobs Loss YES Token";
    const YES_TOKEN_SYMBOL: vector<u8> = b"AIJL-YES";
    const NO_TOKEN_NAME: vector<u8> = b"AI Jobs Loss NO Token";
    const NO_TOKEN_SYMBOL: vector<u8> = b"AIJL-NO";
    
    // Hardcoded prices in USD cents (to avoid decimals)
    const YES_PRICE_CENTS: u64 = 62; // 62% = $0.62
    const NO_PRICE_CENTS: u64 = 38;  // 38% = $0.38
    const APT_TO_USD_CENTS: u64 = 1200; // $12.00 per APT in cents

    // Market data structure
    struct Market has key {
        yes_token_metadata: Object<Metadata>,
        no_token_metadata: Object<Metadata>,
        yes_price_cents: u64,
        no_price_cents: u64,
        total_yes_supply: u64,
        total_no_supply: u64,
        created_at: u64,
    }

    // Store mint and burn capabilities
    struct TokenRefs has key {
        yes_mint_ref: fungible_asset::MintRef,
        yes_burn_ref: fungible_asset::BurnRef,
        no_mint_ref: fungible_asset::MintRef,
        no_burn_ref: fungible_asset::BurnRef,
    }

    // Initialize the market with Yes and No tokens
    public entry fun initialize_market(admin: &signer) {
        let admin_addr = signer::address_of(admin);
        
        // Ensure market doesn't already exist
        assert!(!exists<Market>(admin_addr), EMARKET_EXISTS);

        // Create YES token
        let yes_constructor_ref = &object::create_named_object(admin, YES_TOKEN_SYMBOL);
        primary_fungible_store::create_primary_store_enabled_fungible_asset(
            yes_constructor_ref,
            option::none(),
            string::utf8(YES_TOKEN_NAME),
            string::utf8(YES_TOKEN_SYMBOL),
            8, // decimals
            string::utf8(b"YES token for AI job losses prediction market"),
            string::utf8(b"https://multiverse.finance/icons/ai-jobs.svg"),
        );
        let yes_token_metadata = object::object_from_constructor_ref<Metadata>(yes_constructor_ref);
        let yes_mint_ref = fungible_asset::generate_mint_ref(yes_constructor_ref);
        let yes_burn_ref = fungible_asset::generate_burn_ref(yes_constructor_ref);

        // Create NO token
        let no_constructor_ref = &object::create_named_object(admin, NO_TOKEN_SYMBOL);
        primary_fungible_store::create_primary_store_enabled_fungible_asset(
            no_constructor_ref,
            option::none(),
            string::utf8(NO_TOKEN_NAME),
            string::utf8(NO_TOKEN_SYMBOL),
            8, // decimals
            string::utf8(b"NO token for AI job losses prediction market"),
            string::utf8(b"https://multiverse.finance/icons/ai-jobs.svg"),
        );
        let no_token_metadata = object::object_from_constructor_ref<Metadata>(no_constructor_ref);
        let no_mint_ref = fungible_asset::generate_mint_ref(no_constructor_ref);
        let no_burn_ref = fungible_asset::generate_burn_ref(no_constructor_ref);

        // Store token references
        let token_refs = TokenRefs {
            yes_mint_ref,
            yes_burn_ref,
            no_mint_ref,
            no_burn_ref,
        };
        move_to(admin, token_refs);

        // Create and store market
        let market = Market {
            yes_token_metadata,
            no_token_metadata,
            yes_price_cents: YES_PRICE_CENTS,
            no_price_cents: NO_PRICE_CENTS,
            total_yes_supply: 0,
            total_no_supply: 0,
            created_at: timestamp::now_seconds(),
        };

        move_to(admin, market);
    }

    // Buy YES tokens with APT
    public entry fun buy_yes_tokens(
        buyer: &signer,
        market_address: address,
        apt_amount: u64
    ) acquires Market, TokenRefs {
        let market = borrow_global_mut<Market>(market_address);
        
        assert!(apt_amount > 0, EINVALID_AMOUNT);
        
        // Calculate USD value and tokens to mint
        let usd_value_cents = (apt_amount * APT_TO_USD_CENTS) / 100000000; // APT has 8 decimals
        let tokens_to_mint = (usd_value_cents * 100000000) / market.yes_price_cents; // Convert back to token decimals
        
        // Transfer APT from buyer to market admin
        let apt_metadata = object::address_to_object<Metadata>(@0x000000000000000000000000000000000000000000000000000000000000000a);
        primary_fungible_store::transfer(buyer, apt_metadata, market_address, apt_amount);
        
        // Mint YES tokens to buyer
        let token_refs = borrow_global<TokenRefs>(market_address);
        let yes_tokens = fungible_asset::mint(&token_refs.yes_mint_ref, tokens_to_mint);
        primary_fungible_store::deposit(signer::address_of(buyer), yes_tokens);
        
        // Update supply
        market.total_yes_supply = market.total_yes_supply + tokens_to_mint;
    }

    // Buy NO tokens with APT
    public entry fun buy_no_tokens(
        buyer: &signer,
        market_address: address,
        apt_amount: u64
    ) acquires Market, TokenRefs {
        let market = borrow_global_mut<Market>(market_address);
        
        assert!(apt_amount > 0, EINVALID_AMOUNT);
        
        // Calculate USD value and tokens to mint
        let usd_value_cents = (apt_amount * APT_TO_USD_CENTS) / 100000000; // APT has 8 decimals
        let tokens_to_mint = (usd_value_cents * 100000000) / market.no_price_cents; // Convert back to token decimals
        
        // Transfer APT from buyer to market admin
        let apt_metadata = object::address_to_object<Metadata>(@0x000000000000000000000000000000000000000000000000000000000000000a);
        primary_fungible_store::transfer(buyer, apt_metadata, market_address, apt_amount);
        
        // Mint NO tokens to buyer
        let token_refs = borrow_global<TokenRefs>(market_address);
        let no_tokens = fungible_asset::mint(&token_refs.no_mint_ref, tokens_to_mint);
        primary_fungible_store::deposit(signer::address_of(buyer), no_tokens);
        
        // Update supply
        market.total_no_supply = market.total_no_supply + tokens_to_mint;
    }

    // View functions
    #[view]
    public fun get_market_info(market_address: address): (u64, u64, u64, u64) acquires Market {
        let market = borrow_global<Market>(market_address);
        (market.yes_price_cents, market.no_price_cents, market.total_yes_supply, market.total_no_supply)
    }

    #[view]
    public fun get_yes_token_metadata(market_address: address): Object<Metadata> acquires Market {
        let market = borrow_global<Market>(market_address);
        market.yes_token_metadata
    }

    #[view]
    public fun get_no_token_metadata(market_address: address): Object<Metadata> acquires Market {
        let market = borrow_global<Market>(market_address);
        market.no_token_metadata
    }

    #[view]
    public fun calculate_tokens_for_apt(apt_amount: u64, is_yes_token: bool, market_address: address): u64 acquires Market {
        let market = borrow_global<Market>(market_address);
        let usd_value_cents = (apt_amount * APT_TO_USD_CENTS) / 100000000;
        
        if (is_yes_token) {
            (usd_value_cents * 100000000) / market.yes_price_cents
        } else {
            (usd_value_cents * 100000000) / market.no_price_cents
        }
    }
}

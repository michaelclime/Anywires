const allCountry = [
    'Zimbabwe',
    'Zambia',
    'Yemen',
    'Western Sahara',
    'Wallis and Futuna',
    'Virgin Islands, U.S.',
    'Virgin Islands, British',
    'Vietnam',
    'Venezuela',
    'Vanuatu',
    'Uzbekistan',
    'Uruguay',
    'United States Minor Outlying Islands',
    'United States',
    'United Kingdom',
    'United Arab Emirates',
    'Ukraine',
    'Uganda',
    'Tuvalu',
    'Turks and Caicos Islands',
    'Turkmenistan',
    'Turkey',
    'Tunisia',
    'Trinidad and Tobago',
    'Tonga',
    'Tokelau',
    'Togo',
    'Timor-Leste',
    'Thailand',
    'Tanzania',
    'Tajikistan',
    'Taiwan',
    'Syrian Arab Republic',
    'Switzerland',
    'Sweden',
    'Swaziland',
    'Svalbard and Jan Mayen',
    'Suriname',
    'Sudan',
    'Sri Lanka',
    'Spain',
    'South Sudan',
    'South Georgia and the South Sandwich Islands',
    'South Africa',
    'Somalia',
    'Solomon Islands',
    'Slovenia',
    'Slovakia',
    'Sint Maarten (Dutch part)',
    'Singapore',
    'Sierra Leone',
    'Seychelles',
    'Serbia',
    'Senegal',
    'Saudi Arabia',
    'Sao Tome and Principe',
    'San Marino',
    'Samoa',
    'Saint Vincent and the Grenadines',
    'Saint Pierre and Miquelon',
    'Saint Martin (French part)',
    'Saint Lucia',
    'Saint Kitts and Nevis',
    'Saint Helena, Ascension and Tristan da Cunha',
    'Saint Barthelemy',
    'Rwanda',
    'Russian Federation',
    'Romania',
    'Réunion',
    'Qatar',
    'Puerto Rico',
    'Portugal',
    'Poland',
    'Pitcairn',
    'Philippines',
    'Peru',
    'Paraguay',
    'Papua New Guinea',
    'Panama',
    'Palestine',
    'Palau',
    'Pakistan',
    'Oman',
    'Norway',
    'Northern Mariana Islands',
    'Norfolk Island',
    'Niue',
    'Nigeria',
    'Niger',
    'Nicaragua',
    'New Zealand',
    'New Caledonia',
    'Netherlands',
    'Nepal',
    'Nauru',
    'Namibia',
    'Myanmar',
    'Mozambique',
    'Morocco',
    'Montserrat',
    'Montenegro',
    'Mongolia',
    'Monaco',
    'Moldova',
    'Micronesia',
    'Mexico',
    'Mayotte',
    'Mauritius',
    'Mauritania',
    'Martinique',
    'Marshall Islands',
    'Malta',
    'Mali',
    'Maldives',
    'Malaysia',
    'Malawi',
    'Madagascar',
    'Macedonia',
    'Macao',
    'Luxembourg',
    'Lithuania',
    'Liechtenstein',
    'Libya',
    'Liberia',
    'Lesotho',
    'Lebanon',
    'Latvia',
    "Lao People's Democratic Republic",
    'Kyrgyzstan',
    'Kuwait',
    'North Korea',
    'South Korea',
    'Kiribati',
    'Kenya',
    'Kazakhstan',
    'Jordan',
    'Jersey',
    'Japan',
    'Jamaica',
    'Italy',
    'Israel',
    'Isle of Man',
    'Ireland',
    'Iraq',
    'Iran',
    'Indonesia',
    'India',
    'Iceland',
    'Hungary',
    'Hong Kong',
    'Honduras',
    'Holy See (Vatican City State)',
    'Heard Island and McDonald Islands',
    'Haiti',
    'Guyana',
    'Guinea-Bissau',
    'Guinea',
    'Guernsey',
    'Guatemala',
    'Guam',
    'Guadeloupe',
    'Grenada',
    'Greenland',
    'Greece',
    'Gibraltar',
    'Ghana',
    'Germany',
    'Georgia',
    'Gambia',
    'Gabon',
    'French Southern Territories',
    'French Polynesia',
    'French Guiana',
    'France',
    'Finland',
    'Fiji',
    'Faroe Islands',
    'Falkland Islands (Malvinas)',
    'Ethiopia',
    'Estonia',
    'Eritrea',
    'Equatorial Guinea',
    'El Salvador',
    'Egypt',
    'Ecuador',
    'Dominican Republic',
    'Dominica',
    'Djibouti',
    'Denmark',
    'Czech Republic',
    'Cyprus',
    'Curaçao',
    'Cuba',
    'Croatia',
    "Cote d'Ivoire",
    'Costa Rica',
    'Cook Islands',
    'Congo',
    'Democratic Republic of the Congo',
    'Comoros',
    'Colombia',
    'Cocos (Keeling) Islands',
    'Christmas Island',
    'China',
    'Chile',
    'Chad',
    'Central African Republic',
    'Cayman Islands',
    'Cape Verde',
    'Canada',
    'Cameroon',
    'Cambodia',
    'Burundi',
    'Burkina Faso',
    'Bulgaria',
    'Brunei Darussalam',
    'British Indian Ocean Territory',
    'Brazil',
    'Bouvet Island',
    'Botswana',
    'Bosnia and Herzegovina',
    'Bonaire, Sint Eustatius and Saba',
    'Bolivia',
    'Bhutan',
    'Bermuda',
    'Benin',
    'Belize',
    'Belgium',
    'Belarus',
    'Barbados',
    'Bangladesh',
    'Bahrain',
    'Bahamas',
    'Azerbaijan',
    'Austria',
    'Australia',
    'Aruba',
    'Armenia',
    'Argentina',
    'Antigua and Barbuda',
    'Antarctica',
    'Anguilla',
    'Angola',
    'Andorra',
    'American Sa,moa',
    'Algeria',
    'Albania',
    'Aland Islands',
    'Afghanistan',
 ];

 const Sepa = [
     'Aland Islands',
     'Austria',
     'Azores',
     'Belgium', 
     'Bulgaria', 
     'Canary Islands',
     'Croatia', 
     'Cyprus', 
     'Czech Republic', 
     'Denmark', 
     'Estonia', 
     'Finland', 
     'France', 
     'French Guiana',
     'Germany', 
     'Gibraltar',
     'Greece', 
     'Guadeloupe',
     'Guernsey',
     'Hungary', 
     'Iceland',
     'Ireland', 
     'Isle of Man',
     'Italy', 
     'Jersey',
     'Latvia', 
     'Liechtenstein',
     'Lithuania', 
     'Luxembourg', 
     'Madeira',
     'Malta', 
     'Martinique',
     'Mayotte',
     'Monaco',
     'Netherlands', 
     'Norway',
     'Poland', 
     'Portugal', 
     'Réunion',
     'Romania', 
     'Saint Barthelemy',
     'Saint Martin (French part)',
     'Saint Pierre and Miquelon',
     'San Marino',
     'Slovakia', 
     'Slovenia', 
     'Spain', 
     'Sweden', 
     'Switzerland',
     'United Kingdom'
 ];

class createBank{
    constructor(){
        this.buttonCreateBank  = document.querySelector("#create_bank");
        this.switch = document.querySelector(".switcher_block");
        this.loadingGIF = document.querySelector("#loadingGif");
        this.bankName = "";
        this.render();
    }

    editBankRequest = async (bankName, newData) => {
        return  await fetch("http://localhost:3000/editBank", {
            method: "POST",
            body: JSON.stringify({
                bankName,
                newData
            }),
            headers:{'Content-Type': 'application/json'}
        })
        .then(res => {
            return res.text();
        }) 
        .catch(err => {
            console.log(err);
        });
    }

    editBankInitial = async () => {
        var requiredFields = document.querySelectorAll(".required");
        var empty = this.checkedEmptyArray(requiredFields);

        if (empty === true) {
            this.alertWindow("Please fill out all fields!");
            
            // If All required fields not empty than
        } else if (empty === false) {
            // Checking SEPA, B2B and active
            var sepa = false,
                b2b = false,
                active = false;
            document.querySelector("#sepa").checked ? sepa = true : sepa = false;
            document.querySelector("#b2b").checked ? b2b = true : b2b = false;
            document.querySelector("#active").checked ? active = true : active = false;

            const selectedCountry = document.querySelectorAll(".multi-select__selected-label");
            const selectedArr = [];
            selectedCountry.forEach(item => selectedArr.push(item.textContent.trim()));
            const filteredArr = selectedArr.filter(item => item !== "Sepa" && item !== "Select All");

            var editedBank = {
                "name" : document.querySelector("#bankName").value, 
                "beneficiary_name" : document.querySelector("#benefName").value,  
                "solution_name" : document.querySelector("#solName").value,  
                "country" : filteredArr,
                "beneficiary address" : document.querySelector("#benefAddress").value,
                "max_wire" : +(document.querySelector("#maxWire").value), 
                "min_wire" : +(document.querySelector("#minWire").value),  
                "iban_EUR" : document.querySelector("#IBAN_EUR").value,
                "iban_USD" : document.querySelector("#IBAN_USD").value,
                "swift_bic" : document.querySelector("#SWIFT").value,
                "bank_address" : document.querySelector("#bankAddress").value,
                "company_site" : document.querySelector("#bankComSite").value,
                "stop_limit" : +(document.querySelector("#stopLimit").value),
                "registration_number": document.querySelector("#regNum").value,
                "sepa" : sepa, 
                "b2b" : b2b, 
                "company_logo" : "", 
                "active" : active, 
                "description" : document.querySelector("#description").value, 
                "solution_fees": {
                    "in_c2b":{
                        "percent": +(document.querySelector("#in_c2b_per").value),
                        "flat": +(document.querySelector("#in_c2b_flat").value)
                    },
                    "in_b2b":{
                        "percent": +(document.querySelector("#in_b2b_per").value),
                        "flat": +(document.querySelector("#in_b2b_flat").value)
                    },
                    "transfer":{
                        "percent": +(document.querySelector("#transfer_per").value),
                        "flat": +(document.querySelector("#transfer_flat").value)
                    },
                    "settlement_btc":{
                        "percent": +(document.querySelector("#settBTC_per").value),
                        "flat": +(document.querySelector("#settBTC_flat").value)
                    },
                    "settlement_atm":{
                        "percent": +(document.querySelector("#settATM_per").value),
                        "flat": +(document.querySelector("#settATM_flat").value)
                    },
                    "settlement_c2b_wire":{
                        "percent": +(document.querySelector("#settC2Bwire_per").value),
                        "flat": +(document.querySelector("#settC2Bwire_flat").value)
                    },
                    "settlement_b2b_wire":{
                        "percent": +(document.querySelector("#settB2Bwire_per").value),
                        "flat": +(document.querySelector("#settB2Bwire_flat").value),
                    },
                    "settlement_recall":{
                        "percent": +(document.querySelector("#settRecall_per").value),
                        "flat": +(document.querySelector("#settRecall_flat").value)
                    },
                    "fee_account_additional":{
                        "percent": +(document.querySelector("#feeAccAdd_per").value),
                        "flat": +(document.querySelector("#feeAccAdd_flat").value)
                    },
                    "fee_account_dedicated":{
                        "percent": +(document.querySelector("#feeAccDed_per").value),
                        "flat": +(document.querySelector("#feeAccDed_flat").value)
                    },
                    "fee_account_monthly":{
                        "percent": +(document.querySelector("#feeAccMonthly_per").value),
                        "flat": +(document.querySelector("#feeAccMonthly_flat").value)
                    },
                    "fee_account_setup":{
                        "percent": +(document.querySelector("#feeAccSetup_per").value),
                        "flat": +(document.querySelector("#feeAccSetup_flat").value)
                    },
                    "fine_attitude_incorrect_payment_purpose":{
                        "percent": +(document.querySelector("#fineAttIncPp_per").value),
                        "flat": +(document.querySelector("#fineAttIncPp_flat").value)
                    },
                    "fine_attitude_more_then_1percent_recalls":{
                        "percent": +(document.querySelector("#fineAttMoreThen1perRecalls_per").value),
                        "flat": +(document.querySelector("#fineAttMoreThen1perRecalls_flat").value)
                    },
                    "fine_attitude_more_then_1_payment":{
                        "percent": +(document.querySelector("#fineAttMoreThen1Pay_per").value),
                        "flat": +(document.querySelector("#fineAttMoreThen1Pay_flat").value)
                    },
                    "fine_attitude_payment_from_blocked":{
                        "percent": +(document.querySelector("#fineAttPayFromBlo_per").value),
                        "flat": +(document.querySelector("#fineAttPayFromBlo_flat").value)
                    },
                    "fine_attitude_payment_without_invoice":{
                        "percent": +(document.querySelector("#fineAttPayWithInv_per").value),
                        "flat": +(document.querySelector("#fineAttPayWithInv_flat").value)
                    },
                    "fine_attitude_wrong_amount":{
                        "percent": +(document.querySelector("#fineAttWrongAm_per").value),
                        "flat": +(document.querySelector("#fineAttWrongAm_flat").value)
                    },
                    "fine_recall":{
                        "percent": +(document.querySelector("#fineRecall_per").value),
                        "flat": +(document.querySelector("#fineRecall_flat").value)
                    },
                    "settlement_b2c":{
                        "percent": +(document.querySelector("#settB2C_per").value),
                        "flat": +(document.querySelector("#settB2C_flat").value)
                    },
                    "settlement_refund":{
                        "percent": +(document.querySelector("#settRefund_per").value),
                        "flat": +(document.querySelector("#settRefund_flat").value)
                    }
                }
            };

            // Loading GIF On
            this.loadingGIF.style.display = "flex";

            await this.editBankRequest(this.bankName, editedBank);

            document.location.replace("http://localhost:3000/banks.html");

        }
    }

    getBank = async (number, filter) => {
        return  await fetch("http://localhost:3000/getPart-Banks", {
            method: "POST",
            body: JSON.stringify({
                number, 
                filter
            }),
            headers:{'Content-Type': 'application/json'}
        })
        
        .then(res => {
            return res.json();
        }) 
        .catch(err => {
            console.log(err);
        });
    }

    edtiBankRenderPage = async () => {
        var editedBank = await this.getBank(0, {"name": this.bankName});

        // Bank Info Render
        document.querySelector("#create_bank").innerHTML = "Change";
        var SEPA = document.querySelector("#sepa"),
            B2B = document.querySelector("#b2b"),
            active = document.querySelector(".js-switch");
        editedBank[0].sepa === true ? SEPA.checked = true : SEPA.checked = false;
        editedBank[0].b2b === true ? B2B.checked = true : B2B.checked = false;
        if (editedBank[0].active === true){
            active.setAttribute("checked", "checked");
            this.switcherIphone();
            this.changeSwitcherStatus();
        } else {
            active.removeAttribute("checked", "checked");
            this.switcherIphone();
            this.changeSwitcherStatus();
        }

        // // 1. Multiple select options START
        const containerSelect = document.querySelector('.multi-select__label');
        editedBank[0].country.forEach(item => {
            const optionName = item.trim();
            const selectedOption = document.createElement('span');
            selectedOption.classList.add('multi-select__selected-label');
            selectedOption.setAttribute('data-value', optionName);
            selectedOption.innerHTML = `${optionName}<i class="fa fa-times" data-value="${optionName}"></i>`;
            containerSelect.appendChild(selectedOption);

            const optionsNode = document.querySelectorAll('.multi-select__option');
            optionsNode.forEach(elem => {
                elem.textContent.trim() === optionName ? elem.classList.add('multi-select__option--selected') : null;
            });
        });
        
        // Event for delete Coutries
        document.querySelectorAll('.fa-times').forEach(elem => {
            elem.addEventListener('click', this.deleteElementFromAvailableBanks);
        });

        this.chengeOptionsHeight();
        // // Multiple select options END
        

        var bankName =  document.querySelector("#bankName").value = editedBank[0].name;
        var benefName =  document.querySelector("#benefName").value = editedBank[0].beneficiary_name;
        var solName =  document.querySelector("#solName").value = editedBank[0].solution_name;
        var benefAddress =  document.querySelector("#benefAddress").value = editedBank[0].beneficiary_address;
        var maxWire =  document.querySelector("#maxWire").value = editedBank[0].max_wire;
        var minWire =  document.querySelector("#minWire").value = editedBank[0].min_wire;
        var IBAN_EUR =  document.querySelector("#IBAN_EUR").value = editedBank[0].iban_EUR;
        var IBAN_USD =  document.querySelector("#IBAN_USD").value = editedBank[0].iban_USD;
        var SWIFT =  document.querySelector("#SWIFT").value = editedBank[0].swift_bic;
        var bankAddress =  document.querySelector("#bankAddress").value = editedBank[0].bank_address;
        var bankComSite =  document.querySelector("#bankComSite").value = editedBank[0].company_site;
        var stopLimit =  document.querySelector("#stopLimit").value = editedBank[0].stop_limit;
        var regNum =  document.querySelector("#regNum").value = editedBank[0].registration_number;
        var description =  document.querySelector("#description").value = editedBank[0].description;

        // Commissions Render
        var inc2b_per = document.querySelector("#in_c2b_per").value = editedBank[0].solution_fees.in_c2b.percent;
        var in_c2b_flat = document.querySelector("#in_c2b_flat").value = editedBank[0].solution_fees.in_c2b.flat;
        // 
        var inb2b_per = document.querySelector("#in_b2b_per").value = editedBank[0].solution_fees.in_b2b.percent;
        var inb2b_flat = document.querySelector("#in_b2b_flat").value = editedBank[0].solution_fees.in_b2b.flat;
        // 
        var transfer_per = document.querySelector("#transfer_per").value = editedBank[0].solution_fees.transfer.percent;
        var transfer_flat = document.querySelector("#transfer_flat").value = editedBank[0].solution_fees.transfer.flat;
        // 
        var feeAccSetup_per = document.querySelector("#feeAccSetup_per").value = editedBank[0].solution_fees.fee_account_setup.percent;
        var feeAccSetup_flat = document.querySelector("#feeAccSetup_flat").value = editedBank[0].solution_fees.fee_account_setup.flat;
        // 
        var feeAccMonthly_per = document.querySelector("#feeAccMonthly_per").value = editedBank[0].solution_fees.fee_account_monthly.percent;
        var feeAccMonthly_flat = document.querySelector("#feeAccMonthly_flat").value = editedBank[0].solution_fees.fee_account_monthly.flat;
        // 
        var feeAccAdd_per = document.querySelector("#feeAccAdd_per").value = editedBank[0].solution_fees.fee_account_additional.percent;
        var feeAccAdd_flat = document.querySelector("#feeAccAdd_flat").value = editedBank[0].solution_fees.fee_account_additional.flat;
        // 
        var feeAccDed_per = document.querySelector("#feeAccDed_per").value = editedBank[0].solution_fees.fee_account_dedicated.percent;
        var feeAccDed_flat = document.querySelector("#feeAccDed_flat").value = editedBank[0].solution_fees.fee_account_dedicated.flat;
        // 
        var fineRecall_per = document.querySelector("#fineRecall_per").value = editedBank[0].solution_fees.fine_recall.percent;
        var fineRecall_flat = document.querySelector("#fineRecall_flat").value = editedBank[0].solution_fees.fine_recall.flat;
        // 
        var fineAttIncPp_per = document.querySelector("#fineAttIncPp_per").value = editedBank[0].solution_fees.fine_attitude_incorrect_payment_purpose.percent;
        var fineAttIncPp_flat = document.querySelector("#fineAttIncPp_flat").value = editedBank[0].solution_fees.fine_attitude_incorrect_payment_purpose.flat;
        // 
        var fineAttWrongAm_per = document.querySelector("#fineAttWrongAm_per").value = editedBank[0].solution_fees.fine_attitude_wrong_amount.percent;
        var fineAttWrongAm_flat = document.querySelector("#fineAttWrongAm_flat").value = editedBank[0].solution_fees.fine_attitude_wrong_amount.flat;
        // 
        var fineAttMoreThen1Pay_per = document.querySelector("#fineAttMoreThen1Pay_per").value = editedBank[0].solution_fees.fine_attitude_more_then_1_payment.percent;
        var fineAttMoreThen1Pay_flat = document.querySelector("#fineAttMoreThen1Pay_flat").value = editedBank[0].solution_fees.fine_attitude_more_then_1_payment.flat;
        // 
        var fineAttPayWithInv_per = document.querySelector("#fineAttPayWithInv_per").value = editedBank[0].solution_fees.fine_attitude_payment_without_invoice.percent;
        var fineAttPayWithInv_flat = document.querySelector("#fineAttPayWithInv_flat").value = editedBank[0].solution_fees.fine_attitude_payment_without_invoice.flat;
        // 
        var fineAttPayFromBlo_per = document.querySelector("#fineAttPayFromBlo_per").value = editedBank[0].solution_fees.fine_attitude_payment_from_blocked.percent;
        var fineAttPayFromBlo_flat = document.querySelector("#fineAttPayFromBlo_flat").value = editedBank[0].solution_fees.fine_attitude_payment_from_blocked.flat;
        // 
        var fineAttMoreThen1perRecalls_per = document.querySelector("#fineAttMoreThen1perRecalls_per").value = editedBank[0].solution_fees.fine_attitude_more_then_1percent_recalls.percent;
        var fineAttMoreThen1perRecalls_flat = document.querySelector("#fineAttMoreThen1perRecalls_flat").value = editedBank[0].solution_fees.fine_attitude_more_then_1percent_recalls.flat;
        // 
        var settBTC_per = document.querySelector("#settBTC_per").value = editedBank[0].solution_fees.settlement_btc.percent;
        var settBTC_flat = document.querySelector("#settBTC_flat").value = editedBank[0].solution_fees.settlement_btc.flat;
        // 
        var settATM_per = document.querySelector("#settATM_per").value = editedBank[0].solution_fees.settlement_atm.percent;
        var settATM_flat = document.querySelector("#settATM_flat").value = editedBank[0].solution_fees.settlement_atm.flat;
        // 
        var settC2Bwire_per = document.querySelector("#settC2Bwire_per").value = editedBank[0].solution_fees.settlement_c2b_wire.percent;
        var settC2Bwire_flat = document.querySelector("#settC2Bwire_flat").value = editedBank[0].solution_fees.settlement_c2b_wire.flat;
        // 
        var settB2Bwire_per = document.querySelector("#settB2Bwire_per").value = editedBank[0].solution_fees.settlement_b2b_wire.percent;
        var settB2Bwire_flat = document.querySelector("#settB2Bwire_flat").value = editedBank[0].solution_fees.settlement_b2b_wire.flat;
        // 
        var settRecall_per = document.querySelector("#settRecall_per").value = editedBank[0].solution_fees.settlement_recall.percent;
        var settRecall_flat = document.querySelector("#settRecall_flat").value = editedBank[0].solution_fees.settlement_recall.flat;
        // 
        var settRefund_per = document.querySelector("#settRefund_per").value = editedBank[0].solution_fees.settlement_refund.percent;
        var settRefund_flat = document.querySelector("#settRefund_flat").value = editedBank[0].solution_fees.settlement_refund.flat;
        // 
        var settB2C_per = document.querySelector("#settB2C_per").value = editedBank[0].solution_fees.settlement_b2c.percent;
        var settB2C_flat = document.querySelector("#settB2C_flat").value = editedBank[0].solution_fees.settlement_b2c.flat;

        // Event for Button Create
        document.querySelector("#create_bank").addEventListener("click", this.editBankInitial);

        // Loading GIF On
        this.loadingGIF.style.display = "none";
    }

    editOrCreateBank = async () => {
        var score = decodeURIComponent(location.search.substr(1)).split('&');
        this.bankName = score[1];
        if (this.bankName){
            document.querySelector(".main_title").innerHTML = `Edit: ${this.bankName}`;
            document.title = `Edit bank`;
            this.edtiBankRenderPage();

        } else {
             // Loading GIF Off
            this.loadingGIF.style.display = "none";

            document.querySelector(".main_title").innerHTML = `Create bank`;
            this.buttonCreateBank.addEventListener("click", this.createBank);
            this.switcherIphone();
        }
    }

    changeSwitcherStatus = () => {
        var label = document.querySelector(".switchLabel");
        document.querySelector("#active").checked ? label.innerHTML = "Enable:" : label.innerHTML = "Disable:"; 
    }

    checkedEmptyArray = (arr) => {
        var result = [];
        arr.forEach((item) => {
            item.value ? result.push(true) : result.push(false);
        });
        return result.some((item) => item === false);
    };

    createBankRequest = async (newBank) => {
        return  await fetch("http://localhost:3000/createBank", {
                method: "POST",
                body: JSON.stringify({
                    newBank
                }),
                headers:{'Content-Type': 'application/json'}
            })
            .then(res => {
                return res.text();
            }) 
            .catch(err => {
                console.log(err);
            });
    }

    switcherIphone = (status) => {
        // Switcher like iphone
        var elem = document.querySelector('.js-switch');
        new Switchery(elem, {secondaryColor: '#DF4949', disable: status});
    }

    createBank = async () => {
        var requiredFields = document.querySelectorAll(".required");
        var empty = this.checkedEmptyArray(requiredFields);

        if (empty === true) {
            this.alertWindow("Please fill out all fields!");
            
            // If All required fields not empty than
        } else if (empty === false) {
            // Checking SEPA, B2B and active
            let sepa = false,
                b2b = false,
                active = false;
            document.querySelector("#sepa").checked ? sepa = true : sepa = false;
            document.querySelector("#b2b").checked ? b2b = true : b2b = false;
            document.querySelector("#active").checked ? active = true : active = false;

            const selectedCountry = document.querySelectorAll(".multi-select__selected-label");
            const selectedArr = [];
            selectedCountry.forEach(item => selectedArr.push(item.textContent.trim()));
            const filteredArr = selectedArr.filter(item => item !== "Sepa" && item !== "Select All");

            var bank = {
                "name" : document.querySelector("#bankName").value, 
                "beneficiary_name" : document.querySelector("#benefName").value,  
                "solution_name" : document.querySelector("#solName").value,  
                "country" : filteredArr, 
                "currency": ["EUR", "USD"],
                "beneficiary_address" : document.querySelector("#benefAddress").value,
                "max_wire" : +(document.querySelector("#maxWire").value), 
                "min_wire" : +(document.querySelector("#minWire").value),  
                "iban_EUR" : document.querySelector("#IBAN_EUR").value,
                "iban_USD" : document.querySelector("#IBAN_USD").value,
                "swift_bic" : document.querySelector("#SWIFT").value,
                "bank_address" : document.querySelector("#bankAddress").value,
                "company_site" : document.querySelector("#bankComSite").value,
                "stop_limit" : +(document.querySelector("#stopLimit").value),
                "registration_number": document.querySelector("#regNum").value,
                "sepa" : sepa, 
                "b2b" : b2b, 
                "company_logo" : "", 
                "balance_EUR": {
                    "balance_requested": 0,
                    "balance_sent": 0,
                    "balance_received": 0,
                    "balance_approved": 0,
                    "balance_available": 0,
                    "balance_settlement": 0
                },
                "balance_USD": {
                    "balance_requested": 0,
                    "balance_sent": 0,
                    "balance_received": 0,
                    "balance_approved": 0,
                    "balance_available": 0,
                    "balance_settlement": 0
                },
                "active" : active, 
                "description" : document.querySelector("#description").value, 
                "created_by" : document.querySelector(".userName").textContent,
                "solution_fees": {
                    "in_c2b":{
                        "percent": +(document.querySelector("#in_c2b_per").value),
                        "flat": +(document.querySelector("#in_c2b_flat").value)
                    },
                    "in_b2b":{
                        "percent": +(document.querySelector("#in_b2b_per").value),
                        "flat": +(document.querySelector("#in_b2b_flat").value)
                    },
                    "transfer":{
                        "percent": +(document.querySelector("#transfer_per").value),
                        "flat": +(document.querySelector("#transfer_flat").value)
                    },
                    "settlement_btc":{
                        "percent": +(document.querySelector("#settBTC_per").value),
                        "flat": +(document.querySelector("#settBTC_flat").value)
                    },
                    "settlement_atm":{
                        "percent": +(document.querySelector("#settATM_per").value),
                        "flat": +(document.querySelector("#settATM_flat").value)
                    },
                    "settlement_c2b_wire":{
                        "percent": +(document.querySelector("#settC2Bwire_per").value),
                        "flat": +(document.querySelector("#settC2Bwire_flat").value)
                    },
                    "settlement_b2b_wire":{
                        "percent": +(document.querySelector("#settB2Bwire_per").value),
                        "flat": +(document.querySelector("#settB2Bwire_flat").value),
                    },
                    "settlement_recall":{
                        "percent": +(document.querySelector("#settRecall_per").value),
                        "flat": +(document.querySelector("#settRecall_flat").value)
                    },
                    "fee_account_additional":{
                        "percent": +(document.querySelector("#feeAccAdd_per").value),
                        "flat": +(document.querySelector("#feeAccAdd_flat").value)
                    },
                    "fee_account_dedicated":{
                        "percent": +(document.querySelector("#feeAccDed_per").value),
                        "flat": +(document.querySelector("#feeAccDed_flat").value)
                    },
                    "fee_account_monthly":{
                        "percent": +(document.querySelector("#feeAccMonthly_per").value),
                        "flat": +(document.querySelector("#feeAccMonthly_flat").value)
                    },
                    "fee_account_setup":{
                        "percent": +(document.querySelector("#feeAccSetup_per").value),
                        "flat": +(document.querySelector("#feeAccSetup_flat").value)
                    },
                    "fine_attitude_incorrect_payment_purpose":{
                        "percent": +(document.querySelector("#fineAttIncPp_per").value),
                        "flat": +(document.querySelector("#fineAttIncPp_flat").value)
                    },
                    "fine_attitude_more_then_1percent_recalls":{
                        "percent": +(document.querySelector("#fineAttMoreThen1perRecalls_per").value),
                        "flat": +(document.querySelector("#fineAttMoreThen1perRecalls_flat").value)
                    },
                    "fine_attitude_more_then_1_payment":{
                        "percent": +(document.querySelector("#fineAttMoreThen1Pay_per").value),
                        "flat": +(document.querySelector("#fineAttMoreThen1Pay_flat").value)
                    },
                    "fine_attitude_payment_from_blocked":{
                        "percent": +(document.querySelector("#fineAttPayFromBlo_per").value),
                        "flat": +(document.querySelector("#fineAttPayFromBlo_flat").value)
                    },
                    "fine_attitude_payment_without_invoice":{
                        "percent": +(document.querySelector("#fineAttPayWithInv_per").value),
                        "flat": +(document.querySelector("#fineAttPayWithInv_flat").value)
                    },
                    "fine_attitude_wrong_amount":{
                        "percent": +(document.querySelector("#fineAttWrongAm_per").value),
                        "flat": +(document.querySelector("#fineAttWrongAm_flat").value)
                    },
                    "fine_recall":{
                        "percent": +(document.querySelector("#fineRecall_per").value),
                        "flat": +(document.querySelector("#fineRecall_flat").value)
                    },
                    "settlement_b2c":{
                        "percent": +(document.querySelector("#settB2C_per").value),
                        "flat": +(document.querySelector("#settB2C_flat").value)
                    },
                    "settlement_refund":{
                        "percent": +(document.querySelector("#settRefund_per").value),
                        "flat": +(document.querySelector("#settRefund_flat").value)
                    }
                }
            };
            
            // Loading GIF On
            this.loadingGIF.style.display = "flex";

            await this.createBankRequest(bank);

            // Loading GIF Off
            this.loadingGIF.style.display = "none";
            
            document.location.replace("http://localhost:3000/banks.html");
        }
    }

    alertWindow = (text) => {
        document.body.classList.add("modal-open");
        var filter =  document.querySelector(".alert_filter");
        filter.style.display = "flex";
        document.querySelector("#alert_body_text").innerHTML = text;
        document.querySelector("#alert_button").onclick = (event) =>{
            event.preventDefault();
            document.body.classList.remove("modal-open");
            filter.style.display = "none";
        } 
    }

    renderBankCountries = () => { 
        // Event for opening hiden select 
        document.querySelector('.autocomplete-select').addEventListener('click', (event) => {
            event.preventDefault();

            document.querySelector('.multi-select__select').classList.add('multi-select__select--opened');

            const filterSelect = document.querySelector('.filter_select');
            filterSelect.style.display = 'flex';
            filterSelect.addEventListener("click", (event) => {
                if (event.target === filterSelect){
                    // Hide Modal Window
                    filterSelect.style.display = "none";
                    document.querySelector('.multi-select__select').classList.remove('multi-select__select--opened');
                }
            });

            // this.setFocusForInput('.multi-select__autocomplete');
        });

        
        // Render List of Countries
        allCountry.reverse().forEach(elem => {
            const container = document.querySelector('.multi-select__options');
            const option = document.createElement('div');
            option.classList.add('multi-select__option');
            option.setAttribute('data-value', elem);
            option.innerHTML = `${elem}`;
            container.appendChild(option);
        });

        // Event for every Option is List
        const optionsNode = document.querySelectorAll('.multi-select__option');
        optionsNode.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault();

                const optionName = event.target.getAttribute('data-value');
                const container = document.querySelector('.multi-select__label');
                
                const selectedOption = document.createElement('span');
                selectedOption.classList.add('multi-select__selected-label');
                selectedOption.setAttribute('data-value', optionName);
                selectedOption.innerHTML = `${optionName}<i class="fa fa-times" data-value="${optionName}"></i>`;
                container.appendChild(selectedOption);
                event.target.classList.add('multi-select__option--selected');

                // Event for delete Coutries
                document.querySelectorAll('.fa-times').forEach(elem => {
                    elem.addEventListener('click', this.deleteElementFromAvailableBanks);
                });

                this.chengeOptionsHeight();

            });
        });
    }

    removeAllCountries = () => {
        document.querySelector('.multi-select__label').innerHTML = '';
        document.querySelectorAll('.multi-select__option').forEach(item => item.classList.remove('multi-select__option--selected'));
        this.chengeOptionsHeight();
    }

    selectAllOptions = () => {
        const optionsNode = document.querySelectorAll('.multi-select__option');
        const container = document.querySelector('.multi-select__label');
        container.innerHTML = '';
        optionsNode.forEach(item => {
            const optionName = item.textContent.trim();
            item.classList.add('multi-select__option--selected');
            const selectedOption = document.createElement('span');
            selectedOption.classList.add('multi-select__selected-label');
            selectedOption.setAttribute('data-value', optionName);
            selectedOption.innerHTML = `${optionName}<i class="fa fa-times" data-value="${optionName}"></i>`;
            container.appendChild(selectedOption);
        });
        this.chengeOptionsHeight();
        // Event for delete Coutries
        document.querySelectorAll('.fa-times').forEach(elem => {
            elem.addEventListener('click', this.deleteElementFromAvailableBanks);
        });
    }

    selectSepaOptions = () => {
        const optionsNode = document.querySelectorAll('.multi-select__option');
        const container = document.querySelector('.multi-select__label');
        container.innerHTML = '';
        optionsNode.forEach(item => {
            const optionName = item.textContent.trim();
            if (Sepa.includes(optionName)) {
                item.classList.add('multi-select__option--selected');
                const selectedOption = document.createElement('span');
                selectedOption.classList.add('multi-select__selected-label');
                selectedOption.setAttribute('data-value', optionName);
                selectedOption.innerHTML = `${optionName}<i class="fa fa-times" data-value="${optionName}"></i>`;
                container.appendChild(selectedOption);
            }
        });
        this.chengeOptionsHeight();
        // Event for delete Coutries
        document.querySelectorAll('.fa-times').forEach(elem => {
            elem.addEventListener('click', this.deleteElementFromAvailableBanks);
        });
    }


    deleteElementFromAvailableBanks = (e) => {
        e.preventDefault();
        const elemName = e.target.getAttribute('data-value');
        
        document.querySelectorAll('.multi-select__option').forEach(item => {
        
            elemName === item.textContent.trim() 
            ?
            item.classList.remove('multi-select__option--selected')
            :
            null

        });
        e.target.closest('span').remove();
        
        this.chengeOptionsHeight();
    }

    
    chengeOptionsHeight = () => {
        // Checking height of Block With elemtns
        const heightWrapper = document.querySelector('.autocomplete-select').clientHeight;
        document.querySelector('.multi-select__options').style.top = `${heightWrapper + 10}px`;
    }


    setFocusForInput = (input) => {
        document.querySelector(input).focus();
    }


    eventForInput = () => {
        document.querySelector('.multi-select__autocomplete').addEventListener('keyup', (event) => {
            event.preventDefault()

            const optionsNode = document.querySelectorAll('.multi-select__option');
            optionsNode.forEach(item => {
                if (event.target.value.trim()) {
                    const firstArr = (item.textContent.trim().toLowerCase());
                    const secondArr = (event.target.value.trim().toLowerCase());

                    firstArr.includes(secondArr)
                    ?
                    item.classList.remove('multi-select__option--hidden')
                    :
                    item.classList.add('multi-select__option--hidden')
                } else {
                    item.classList.remove('multi-select__option--hidden');
                }

            });
        });
    }

    render(){
        this.editOrCreateBank();
        this.switch.addEventListener("click", this.changeSwitcherStatus);
        this.renderBankCountries()
        this.eventForInput();
        document.querySelector('#bankCountry__buttons--remove-all').addEventListener('click', this.removeAllCountries);
        document.querySelector('#bankCountry__buttons--select-all').addEventListener('click', this.selectAllOptions);
        document.querySelector('#bankCountry__buttons--sepa').addEventListener('click', this.selectSepaOptions);
    }
}

const create = new createBank();
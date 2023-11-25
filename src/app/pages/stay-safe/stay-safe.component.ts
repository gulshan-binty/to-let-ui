import { Component } from '@angular/core';

@Component({
  selector: 'app-stay-safe',
  templateUrl: './stay-safe.component.html',
  styleUrls: ['./stay-safe.component.scss']
})
export class StaySafeComponent {


  data1: any[] = [
    {
      id: '1',
      title: 'Keep things local',
      description: 'Meet the seller in person and check the item before you make a payment.Where available, use.'
    },
    {
      id: '2',
      title: 'While applying for a job',
      description: 'Research the job and the employer before you apply.Don’t give out personal information before meeting the employer in person.Avoid going to remote locations for an interview.'
    },
    {
      id: '3',
      title: 'Exchange item and payment at the same time',
      description: "Buyers: don't make any payments before receiving an item.Sellers: don't send an item before receiving payment."
    },
    {
      id: '4',
      title: 'Use common sense',
      description: "Avoid anything that appears too good to be true, such as unrealistically low prices and promises of quick money."
    },
    {
      id: '5',
      title: 'Never give out financial information',
      description: "This includes bank account details, eBay/PayPal info, and any other information that could be misused."
    },
  ];

  data2: any[] = [
    {
      id: '1',
      title: 'Fake payment services',
      description: 'queriescare does not offer any form of payment scheme or protection. Please report any emails claiming to offer such services. Avoid using online payment services or escrow sites unless you are 100% sure that they are genuine.'
    },
    {
      id: '2',
      title: 'Fake information requests',
      description: 'queriescare never sends emails requesting your personal details. If you receive an email asking you to provide your personal details to us, do not open any links. Please report the email and delete it.'
    },
    {
      id: '3',
      title: 'Fake fee requests',
      description: "Avoid anyone that asks for extra fees to buy or sell an item or service. queriescare never requests payments for its basic services, and doesn't allow items that are not located in Sri Lanka, so import and brokerage fees should never be required."
    },
    {
      id: '4',
      title: 'Requests to use money transfer services such as Western Union or MoneyGram',
      description: "These services are not meant for transactions between strangers and many scams are run through them. Avoid requests to use these services."
    },
  ];


  data3: any[] = [
    {
      id: '1',
      title: 'Email address is not shown on your ad',
      description: 'This ensures that you are protected from spam.'
    },
    {
      id: '2',
      title: 'Option to hide phone number on your ad',
      description: 'You can choose to hide your phone number and still be contacted by interested buyers via chat.'
    },
    {
      id: '3',
      title: 'Continuous improvements',
      description: 'We make constant imrpovements to our technology to detect and prevent suspicious or inappropriate activity.'
    },
    {
      id: '4',
      title: 'Block repeat offendors',
      description: 'We track reports of suspicious or illegal activity to prevent offendors from using the site again.'
    },
  ];

  data4: any[] = [
    {
      id: '1',
      title: 'Victim of a scam?',
      description: 'If you feel that you have been the victim of a scam, please report your situation to us immediately. If you have been cheated, we also recommend that you contact your local police department.'
    },

    {
      id: '2',
      title: 'Information sharing',
      description: 'queriescare is committed to the privacy of our users and does not share user information publicly. However, we take safety seriously and will cooperate with law enforcement if receive requests regarding fraudulent or other criminal activity.'
    },
  ]
}

/*







*/




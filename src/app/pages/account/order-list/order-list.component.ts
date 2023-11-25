import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ORDERPROCESSING } from 'src/app/core/db/order-processing.db';
import { OrderProcessing } from 'src/app/interfaces/common/order-processing';
// import { AccountService } from '/src/app/services/common/account.service';
import { OrderService } from 'src/app/services/common/order.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from './pdf-fonts';
import { User } from 'src/app/interfaces/common/user.interface';
import { UtilsService } from 'src/app/services/core/utils.service';
import { UserDataService } from 'src/app/services/common/user-data.service';
import { PDF_MAKE_LOGO } from 'src/app/core/utils/global-variable';
import { DatePipe } from '@angular/common';
import { UiService } from 'src/app/services/core/ui.service';
import { ReloadService } from 'src/app/services/core/reload.service';
import {Order} from "../../../interfaces/common/order.interface";
import {AccountService} from "../../../services/common/account.service";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.fonts = {
  Poppins: {
    normal: 'Poppins-Regular.ttf',
    bold: 'Poppins-SemiBold.ttf',
    italics: 'Poppins-Italic.ttf',
    bolditalics: 'Poppins-Italic.ttf',
  },
  Sutonny: {
    normal: 'sutonny.ttf',
    bold: 'sutonny.ttf',
    italics: 'sutonny.ttf',
    bolditalics: 'sutonny.ttf',
  },
  Nikosh: {
    normal: 'nikosh.ttf',
    bold: 'nikosh.ttf',
    italics: 'nikosh.ttf',
    bolditalics: 'nikosh.ttf',
  },
};

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  providers: [DatePipe],
})
export class OrderListComponent implements OnInit, OnDestroy {

  // STORE DATA
  orderId: string = null;
  order?: Order = null;
  user: User;

  // SUBSCRIPTION
  private subRouteParam: Subscription;
  private subDataOne: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private accountService: AccountService,
    private userService: UserDataService,
    private utilsService: UtilsService,
    private datePipe: DatePipe,
    private uiService: UiService,
    private reloadService: ReloadService
  ) { }

  ngOnInit(): void {
    console.log(this.order);

    this.reloadService.refreshData$.subscribe(() => {
      this.subRouteParam = this.activatedRoute.paramMap.subscribe(
        param => {
          this.orderId = param.get('orderId');
          if (this.orderId) {
            this.getOrderById(this.orderId);
          }
        }
      );
    })

    this.subRouteParam = this.activatedRoute.paramMap.subscribe(
      param => {
        this.orderId = param.get('orderId');
        if (this.orderId) {
          this.getOrderById(this.orderId);
        }
      }
    );

    this.accountService.orderBackShow.next(false);
    this.getLoggedUserInfo();

  }

  onShoeSideBar() {
    this.accountService.orderBackShow.next(true);
    history.back();
  }

  /**
   * HTTP REQUEST HANDLE
   * getOrderById()
   */

  getOrderById(id: string) {
    this.subDataOne = this.orderService.getOrderById(id).subscribe((res) => {
      if (res.success) {
        this.order = res.data;
      }
    },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )
  }

  private getLoggedUserInfo() {
    this.subDataOne = this.userService.getLoggedInUserData().subscribe((res) => {
      if (res) {
        this.user = res.data;
      }
    },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    )
  }


  /**
   * NEW PDF MAKE
   * ASYNC FUNCTION (FOR IMAGE COMPRESS)
   * downloadPdfInvoice()
   * getInvoiceDocument()
   * getDocumentDefinitionForPdf()
   * getProfilePicObjectPdf()
   * getPaymentTable()
   * urlToBase64()
   * getBase64ImageFromURL()
   * dataTableForPdfMake()
   * getItemTable()
   * getCalculationTable()
   * pdfMakeStyleObject()
   */

  async downloadPdfInvoice(type?: string) {
    const documentDefinition = await this.getInvoiceDocument();

    if (type === 'download') {
      pdfMake
        .createPdf(documentDefinition)
        .download(`Order_${this.order.orderId}.pdf`);
    } else if (type === 'print') {
      pdfMake.createPdf(documentDefinition).print();
    } else {
      pdfMake
        .createPdf(documentDefinition)
        .download(`Order_${this.order.orderId}.pdf`);
    }
  }

  private async getInvoiceDocument() {
    const documentObject = {
      content: [
        {
          columns: [
            await this.getProfilePicObjectPdf(),
            [
              {
                width: 'auto',
                text: `medicinedipo.com`,
                style: 'p',
              },
              {
                width: 'auto',
                text: `Dhanmondi, Dhaka`,
                style: 'p',
              },
              {
                width: 'auto',
                text: `Telephone: 09611677835`,
                style: 'p',
              },
              {
                width: 'auto',
                text: `Email: medicinedipobd@gmail.com`,
                style: 'p',
              },
            ],
            [
              {
                width: '*',
                text: [
                  `Invoice ID: `,
                  {
                    text: 'SL-' + this.order?.orderId,
                    bold: true,
                  },
                ],
                style: 'p',
                alignment: 'right',
              },
              {
                width: '*',
                text: `${"Customer Login Phone Number"} (${this.user && this.user.phoneNo
                    ? this.user.phoneNo
                    : this.order.phoneNo
                  })`,
                style: 'p',
                alignment: 'right',
              },
            ],
          ],
          columnGap: 10,
        }, // END TOP INFO SECTION
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 5,
              x2: 535,
              y2: 5,
              lineWidth: 0.5,
              lineColor: '#E8E8E8',
            },
          ],
        }, // END TOP INFO BORDER
        {
          columns: [
            [
              {
                width: 'auto',
                text: `Delivery Address: ${this.order.shippingAddress}`,
                style: ['pBn'],
                margin: [0, 8, 0, 0],
              },
              {
                width: 'auto',
                text: [
                  `Name: `,
                  {
                    text: this.order.name,
                    bold: true,
                  },
                ],
                style: 'pBn',
              },
              {
                width: 'auto',
                text: `Address: ${this.order.shippingAddress}`,
                style: ['pBn'],
              },
              {
                width: 'auto',
                text: [
                  `Phone: `,
                  {
                    text: this.order.phoneNo,
                    bold: true,
                  },
                ],
                style: 'p',
              },
              {
                width: 'auto',
                text:
                  this.order.preferredDate && this.order.preferredTime
                    ? `(${this.utilsService.getDateString(
                      this.order.preferredDate,
                      'll'
                    )} তারিখ ${this.order.preferredTime
                    } সময়ের মধ্যে ডেলিভারি দিবেন)`
                    : '',
                style: ['pBn'],
              },
            ],
            {
              width: '*',
              alignment: 'left',
              text: '',
            }, // Middle Space for Make Column Left & Right
            [
              {
                width: 'auto',
                text: `Order Info:`,
                style: 'p',
                margin: [0, 8, 0, 0],
              },
              {
                width: 'auto',
                text: [
                  `Order Id: `,
                  {
                    text: '#' + this.order.orderId,
                    bold: true,
                  },
                ],
                style: 'p',
              },
              {
                width: 'auto',
                text: `Date Added: ${this.utilsService.getDateString(
                  new Date(),
                  'll'
                )}`,
                style: 'p',
              },
              {
                width: 'auto',
                text: [
                  `Payment Status: `,
                  {
                    text: this.order.paymentStatus,
                    bold: true,
                  },
                ],
                style: 'p',
              },
              {
                width: 'auto',
                text: [
                  `Total Product: `,
                  {
                    text: `${this.order.orderedItems.length}Items`,
                    bold: true,
                  },
                ],
                style: 'p',
              },
            ],

          ],
          columnGap: 25,
        },
        {
          columns: [
            [
              {
                width: 'auto',
                text: ` ${this.order.preferredDateString} ${this.order.preferredTime}`,
                style: ['pBn'],
                margin: [0, 8, 0, 0],
              },
            ],
          ],
        },
        {
          canvas: [
            { type: 'line', x1:  -1, y1: 5, x2: 140, y2: 5,   lineWidth: 0.5,
            lineColor: '#E8E8E8',},

            { type: 'line', x1: -1, y1:-20, x2: 140, y2: -20,   lineWidth: 0.5,
            lineColor: '#E8E8E8', },
            { type: 'line', x1: -1, y1: -20, x2: -1, y2: 6,  lineWidth: 0.5,
            lineColor: '#E8E8E8', },
            { type: 'line', x1: 140, y1: -20, x2: 140, y2: 6,  lineWidth: 0.5,
            lineColor: '#E8E8E8',}
        ]
        },
        {
          style: 'gapY',
          columns: [this.getItemTable()],
        }, // END ITEM TABLE SECTION
        {
          style: 'gapY',
          columns: [
            [
              {
                width: 'auto',
                text: [
                  `Preferred Delivery Time: `,
                  {
                    text:
                      '#' + this.order.preferredDate && this.order.preferredTime
                        ? this.order.preferredTime +
                        ' ' +
                        this.datePipe.transform(this.order.preferredDate,'MMM d, y')
                        : 'N/A',
                    bold: true,
                  },
                ],
                style: 'p',
              },
              {
                width: 'auto',
                text: [
                  `Note: `,
                  {
                    text:
                      '#' + this.order.note && this.order.note !== null
                        ? this.order.note
                        : 'N/A',
                    bold: true,
                  },
                ],
                style: 'pBn',
              },
            ],
            {
              width: '*',
              alignment: 'left',
              text: '',
            }, // Middle Space for Make Column Left & Right
            [
              {
                width: 'auto',
                text: [
                  {
                    text:
                      this.order.productDiscount &&
                        this.order.productDiscount > 0
                        ? `You Saved ${this.order.productDiscount} TK from medicinedipo.com`
                        : '',
                    bold: true,
                  },
                ],
                style: 'p',
              },
              this.getCalculationTable(),
            ],
          ],
        }, // END CALCULATION SECTION
        {
          canvas: [
            {
              type: 'line',
              x1: 0,
              y1: 5,
              x2: 535,
              y2: 5,
              lineWidth: 0.5,
              lineColor: '#E8E8E8',
            },
          ],
        }, // END TOP INFO BORDER
        {
          style: 'gapXY',
          columns: [
            [
              {
                canvas: [
                  {
                    type: 'line',
                    x1: 0,
                    y1: 5,
                    x2: 100,
                    y2: 5,
                    lineWidth: 1,
                    lineColor: '#767676',
                  },
                ],
              },
              {
                width: 'auto',
                text: [`Received By `],
                style: 'p',
                margin: [22, 10],
              },
            ],
            {
              width: '*',
              alignment: 'left',
              text: '',
            }, // Middle Space for Make Column Left & Right
            [
              {
                alignment: 'right',
                canvas: [
                  {
                    type: 'line',
                    x1: 0,
                    y1: 5,
                    x2: 100,
                    y2: 5,
                    lineWidth: 1,
                    lineColor: '#767676',
                  },
                ],
              },
              {
                width: '100',
                text: [`Authorized By `],
                style: 'p',
                alignment: 'right',
                margin: [22, 10],
              },
            ],
          ],
        },
        {
          text: 'Thank you for your order from www.medicinedipo.com',
          style: 'p',
          alignment: 'center',
          margin: [0, 10],
        },
      ],
      defaultStyle: {
        font: 'Poppins',
      },
      styles: this.pdfMakeStyleObject,
    };

    return documentObject;
  }

  async getDocumentDefinitionForPdf() {
    return {
      content: [
        {
          text: 'Invoice',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20],
        },
        {
          columns: [
            [await this.getProfilePicObjectPdf()],
            [
              {
                text: `Invoice:  #100`,
                style: 'name',
                alignment: 'right',
              },
              {
                text: '20/10/2021',
                alignment: 'right',
              },
              {
                text: 'Customer Id : ' + '100',
                alignment: 'right',
              },
              {
                text: 'Bill Type : ' + 'Regular',
                alignment: 'right',
              },
            ],
          ],
        },
        {
          style: 'gapBig',
          columns: [
            [
              {
                text: 'From',
                alignment: 'left',
              },
              {
                text: 'Cash Management',
                style: 'name',
                alignment: 'left',
              },
              {
                text: 'Mirpur-10, Dhaka-1216',
                alignment: 'left',
              },
              {
                text: '01894885631',
                alignment: 'left',
              },
              {
                text: 'www.osudkini.com',
                alignment: 'left',
              },
            ],
            [
              {
                text: 'To',
                alignment: 'right',
              },
              {
                text: 'Md Sazib',
                style: 'name',
                alignment: 'right',
              },
              {
                text: '01894885631',
                alignment: 'right',
              },
              {
                text: 'Sazib Store',
                alignment: 'right',
              },
              {
                text: 'Mirpur',
                alignment: 'right',
              },
            ],
          ],
        },
        {
          text: '',
          style: 'gapBig',
        },
        this.getPaymentTable(),
        {
          text: '',
          style: 'gapSmall',
        },
        {
          text: '',
          alignment: 'right',
        },
        {
          text: 'Sub Total     ' + '900' + ' /-',
          style: 'totalInfo',
          alignment: 'right',
        },
        {
          text: 'Vat(15%)     ' + '2000' + ' /-',
          style: 'totalInfo',
          alignment: 'right',
        },
        {
          text: 'Total     ' + '5000' + ' /-',
          style: 'totalInfo',
          alignment: 'right',
        },
        {
          text: 'Thank you for your business!',
          alignment: 'center',
          style: 'gapBig',
        },
        {
          text: 'If you have any questions about this invoice, please contact with us',
          alignment: 'center',
        },

        {
          style: 'gapBig',
          columns: [
            [
              {
                text: 'wqijw',
                style: 'name',
                alignment: 'left',
              },
              {
                text: '01977-148917',
                alignment: 'left',
              },
              {
                text: 'asnass@gmail.com',
                alignment: 'left',
              },
              {
                text: 'Visit Facebook Page',
                link: 'https://www.facebook.com/cashmanagementltd',
                color: 'blue',
                alignment: 'left',
              },
            ],
            [
              {
                qr: 'Cash , Contact No : 09611677835',
                fit: 100,
                alignment: 'right',
              },
            ],
          ],
        },
      ],
      info: {
        title: 'Cash Invoice',
        author: 'Sazib',
        subject: 'Invoice',
        keywords: 'Invoice',
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: 'underline',
        },
        name: {
          fontSize: 16,
          bold: true,
        },
        totalInfo: {
          fontSize: 12,
          bold: true,
          lineHeight: 1.5,
        },
        jobTitle: {
          fontSize: 14,
          bold: true,
          italics: true,
        },
        sign: {
          margin: [0, 50, 0, 10],
          alignment: 'right',
          italics: true,
        },
        tableHeader: {
          bold: true,
        },
        gapMid: {
          margin: [0, 20, 0, 10],
        },
        gapBig: {
          margin: [0, 40, 0, 20],
        },
        gapSmall: {
          margin: [0, 10, 0, 5],
        },
      },
    };
  }

  async getProfilePicObjectPdf() {
    return {
      image: await this.getBase64ImageFromURL(PDF_MAKE_LOGO),
      width: 110,
      marginTop: 10,
      alignment: 'left',
    };
  }

  getPaymentTable() {
    return {
      table: {
        widths: ['*', '*'],
        body: [
          [
            {
              text: 'Description',
              style: 'tableHeader',
            },
            {
              text: 'Amount',
              style: 'tableHeader',
              alignment: 'right',
            },
          ],
          [
            {
              text: 'ashas' + '-' + '20/10/2021',
            },
            {
              text: '10,000' + ' /-',
              alignment: 'right',
            },
          ],
        ],
      },
    };
  }

  urlToBase64(url: string) {
    return new Promise((resolve, reject) => {
      let base64;

      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();

      xhr.addEventListener('load', () => {
        const reader = new FileReader();
        reader.readAsDataURL(xhr.response);
        reader.addEventListener('loadend', () => {
          base64 = reader.result;
          const imageBase64 = reader.result as string;
          resolve(imageBase64);
        });
      });
    });
  }

  getBase64ImageFromURL(url): Promise<any> {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');

      img.onload = () => {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL('image/png');

        resolve(dataURL);
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.src = url;
    });
  }

  dataTableForPdfMake() {
    const tableHead = [
      {
        text: 'SL',
        style: 'tableHead',
        // border: [true, true, true, true],
        fillColor: '#DEDEDE',
        borderColor: ['#eee', '#eee', '#eee', '#eee'],
      },
      {
        text: 'Product',
        style: 'tableHead',
        // border: [true, true, true, true],
        fillColor: '#DEDEDE',
        borderColor: ['#eee', '#eee', '#eee', '#eee'],
      },
      {
        text: 'Unit',
        style: 'tableHead',
        fillColor: '#DEDEDE',
        borderColor: ['#eee', '#eee', '#eee', '#eee'],
      },
      {
        text: 'Quantity',
        style: 'tableHead',
        fillColor: '#DEDEDE',
        borderColor: ['#eee', '#eee', '#eee', '#eee'],
      },
      {
        text: 'Discount',
        style: 'tableHead',
        fillColor: '#DEDEDE',
        borderColor: ['#eee', '#eee', '#eee', '#eee'],
      },
      {
        text: 'Price',
        style: 'tableHead',
        fillColor: '#DEDEDE',
        borderColor: ['#eee', '#eee', '#eee', '#eee'],
      },
      {
        text: 'Total',
        style: 'tableHead',
        fillColor: '#DEDEDE',
        borderColor: ['#eee', '#eee', '#eee', '#eee'],
      },
    ];

    const finalTableBody = [tableHead];
    this.order.orderedItems.forEach((m, i) => {
      const res = [
        {
          text: i + 1,
          style: 'tableBody',
          borderColor: ['#eee', '#eee', '#eee', '#eee'],
        },
        {
          text: m.name,
          style: 'tableBody',
          borderColor: ['#eee', '#eee', '#eee', '#eee'],
        },
        {
          text: m.unit,
          style: 'tableBody',
          borderColor: ['#eee', '#eee', '#eee', '#eee'],
        },
        {
          text: m.quantity,
          style: 'tableBody',
          borderColor: ['#eee', '#eee', '#eee', '#eee'],
        },
        {
          text: `${m?.discountAmount && m?.discountAmount != null ?  m?.discountAmount + '%' : 'N/A'}`,
          style: 'tableBody',
          borderColor: ['#eee', '#eee', '#eee', '#eee'],
        },
        {
          text: m.unitPrice,
          style: 'tableBody',
          borderColor: ['#eee', '#eee', '#eee', '#eee'],
        },
        {
          text: m.unitPrice * m.quantity,
          style: 'tableBody',
          borderColor: ['#eee', '#eee', '#eee', '#eee'],
        },
      ];
      // @ts-ignore
      finalTableBody.push(res);
    });

    return finalTableBody;
  }

  getItemTable() {
    return {
      table: {
        widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto', 'auto'],
        body: this.dataTableForPdfMake(),
      },
    };
  }

  getCalculationTable() {
    return {
      table: {
        widths: ['*', '*'],
        body: [
          [
            {
              text: 'SubTotal',
              style: 'tableHead',

              borderColor: ['#eee', '#eee', '#eee', '#eee'],
            },
            {
              text: `${this.order.subTotal} TK`,
              style: 'tableBody',
              borderColor: ['#eee', '#eee', '#eee', '#eee'],
            },
          ],
          [
            {
              text: 'Delivery Charge',
              style: 'tableHead',

              borderColor: ['#eee', '#eee', '#eee', '#eee'],
            },
            {
              text: `${this.order.deliveryCharge} TK`,
              style: 'tableBody',
              borderColor: ['#eee', '#eee', '#eee', '#eee'],
            },
          ],
          [
            {
              text: 'Grand Total',
              style: 'tableHead',

              borderColor: ['#eee', '#eee', '#eee', '#eee'],
            },
            {
              text: `${this.order.grandTotal} TK`,
              style: 'tableBody',
              borderColor: ['#eee', '#eee', '#eee', '#eee'],
            },
          ],
        ],
      },
    };
  }

  get pdfMakeStyleObject(): object {
    return {
      p: {
        font: 'Poppins',
        fontSize: 9,
      },
      pBn: {
        font: 'Nikosh',
        fontSize: 9,
        lineHeight: 2,
      },
      tableHead: {
        font: 'Poppins',
        fontSize: 9,
        bold: true,
        margin: [5, 2],
      },
      tableBody: {
        font: 'Poppins',
        fontSize: 9,
        margin: [5, 2],
      },
      gapY: {
        margin: [0, 8],
      },
      gapXY: {
        margin: [0, 40],
      },
    };
  }

  /***
 * HTTP REQUEST HANDLE
 */
  public onOrderCancel(id?: string, data?: any, event?: MouseEvent) {
    event.stopImmediatePropagation();
    this.subDataOne = this.orderService.updateOrderById(id, data).subscribe((res) => {
      if (res.success) {
        this.uiService.success('Order cancelled successfully');
        this.reloadService.needRefreshData$();
      }
    },
      (err) => {
        console.log(err);
      }
    )


  }



  /**
   * NG ON DESTROY
  */
  ngOnDestroy() {
    if (this.subRouteParam) {
      this.subRouteParam.unsubscribe();
    }
    if (this.subDataOne) {
      this.subDataOne.unsubscribe();
    }
  }

}

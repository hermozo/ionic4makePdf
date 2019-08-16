import {Component} from '@angular/core';
import {WheelSelector} from '@ionic-native/wheel-selector/ngx';
import {Calendar} from '@ionic-native/calendar/ngx';
import {DocumentViewer, DocumentViewerOptions} from "@ionic-native/document-viewer/ngx";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;


import {File} from '@ionic-native/file/ngx';
import {FileOpener} from '@ionic-native/file-opener/ngx';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    public letterObj = {
        to: '',
        from: '',
        text: ''
    }

    pdfObj = null;
    jsonData: any;

    constructor(private selector: WheelSelector,
                private document: DocumentViewer,
                private file: File, private calendar: Calendar,
                private fileOpener: FileOpener) {
    }

    public viewpdf() {
        const options: DocumentViewerOptions = {
            title: 'My PDF'
        }

        this.document.viewDocument(this.file.dataDirectory + '/myletter.pdf', 'application/pdf', options);
    }


    public createPdfxxxx() {
        console.log('CRAEEsssssT PDF');
        let layout = {
            exampleLayout: {
              hLineWidth: function (i, node) {
                if (i === 0 || i === node.table.body.length) {
                  return 0;
                }
                return (i === node.table.headerRows) ? 2 : 1;
              },
              vLineWidth: function (i) {
                return 0;
              },
              hLineColor: function (i) {
                return i === 1 ? 'black' : '#aaa';
              },
              paddingLeft: function (i) {
                return i === 0 ? 0 : 8;
              },
              paddingRight: function (i, node) {
                return (i === node.table.widths.length - 1) ? 0 : 8;
              }
            }
          };
        let doc: any = {
            content: [
                {text:'Santa Cruz 16/08/2019' + (new Date().toTimeString()), alignment:'right'},
                {text:'Pedido No. 000551', alignment:'right'},
                {text:'COMPROBANTE DE PEDIDO', alignment:'center', style:'header'},
                {text:' ', alignment:'center'},
                {text:' ', alignment:'center'},
                {text:'Nombre: Alcides Avaroma R.'},
                {text:'Telefono: (591)708-28708'},
                {text:'Direccion: Av. Paragua B. CONAVI c. Cnel. A. Aimerich 3490'},
                {text:' ', alignment:'center'},
                {text:' ', alignment:'center'},
                {layout: 'lightHorizontalLines', // optional
                    table: {
                        // headers are automatically repeated if the table spans over multiple pages
                        // you can declare how many rows should be treated as headers
                        headerRows: 1,
                        widths: [ '*', 'auto', 100, '*', '*' ],

                    body: [
                      [ 'Item', 'Cant.', 'P/U', 'Desc.', 'total' ],
                      [ 'Cigarrillo LM', '100', 'Bs.70.00', '00.00', '7000.00' ],
                      [ 'Cigarrillo Camel', '50', 'Bs.100.00', '100.00', '4900.00' ],
                      [ 'Cigarrillo Malboro', '100', 'Bs.80.00', '00.00', '8000.00' ],
                      [ 'Cigarrillo Derby', '100', 'Bs.80.00', '00.00', '8000.00' ],
                      [ 'Kolgerg', '100', 'Bs.70.00', '00.00', '7000.00' ],
                      [ 'Chanceler', '50', 'Bs.100.00', '100.00', '4900.00' ],
                      [ 'Chivas regal', '100', 'Bs.80.00', '00.00', '8000.00' ],
                      [ 'JB', '100', 'Bs.80.00', '00.00', '8000.00' ],
                      [ { text: 'TOTAL', bold: true }, '', '', '200.00', '55800.00' ]
                    ]
                }}
                //{text: 'From', style: 'subheader'},
                //{text: this.letterObj.from},
                //{text: 'To', style: 'subheader'},
                //this.letterObj.to,
                //{text: this.letterObj.text, style: 'story', margin: [0, 20, 0, 20]},
                /*{
                    ul: [
                        'Bacon',
                        'Rips',
                        'BBQ',
                    ]
                }*/
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                },
                subheader: {
                    fontSize: 14,
                    bold: true,
                    margin: [0, 15, 0, 0]
                },
                story: {
                    italic: true,
                    alignment: 'center',
                    width: '50%',
                }
            }
        };
        this.pdfObj = pdfMake.createPdf(doc,layout);
        console.log(this.pdfObj);
    }


    downloadPdf() {
        this.pdfObj.getBuffer((buffer) => {
            const blob = new Blob([buffer], {type: 'application/pdf'});
            this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, {replace: true})
                .then(fileEntry => {
                    this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
                });
        });
    }


    public selectANumber() {
        this.jsonData = {
            numbers: [
                {description: "1"},
                {description: "2"},
                {description: "3"}
            ],
            fruits: [
                {description: "Apple"},
                {description: "Banana"},
                {description: "Tangerine"}
            ],
            firstNames: [
                {name: "Fred", id: '1'},
                {name: "Jane", id: '2'},
                {name: "Bob", id: '3'},
                {name: "Earl", id: '4'},
                {name: "Eunice", id: '5'}
            ],
            lastNames: [
                {name: "Johnson", id: '100'},
                {name: "Doe", id: '101'},
                {name: "Kinishiwa", id: '102'},
                {name: "Gordon", id: '103'},
                {name: "Smith", id: '104'}
            ]
        };
        this.selector.show({
            title: "How Many?",
            items: [
                this.jsonData.numbers
            ],
        }).then(
            result => {
                console.log(result[0].description + ' at index: ' + result[0].index);
            },
            err => console.log('Error: ', err)
        );
    }


    public async calendario() {
        await this.calendar.createCalendar('MyCalendar').then(
            (msg) => {
                console.log(msg);
            },
            (err) => {
                console.log(err);
            }
        );
    }


}

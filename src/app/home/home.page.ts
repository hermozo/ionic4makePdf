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
        let doc: any = {
            content: [
                {text: 'REMINDER', style: 'header'},
                {text: new Date().toTimeString(), alignment: 'right'},
                {text: 'From', style: 'subheader'},
                {text: this.letterObj.from},
                {text: 'To', style: 'subheader'},
                this.letterObj.to,
                {text: this.letterObj.text, style: 'story', margin: [0, 20, 0, 20]},
                {
                    ul: [
                        'Bacon',
                        'Rips',
                        'BBQ',
                    ]
                }
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
        this.pdfObj = pdfMake.createPdf(doc);
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

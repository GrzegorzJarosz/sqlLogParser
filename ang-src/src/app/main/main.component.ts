import { Component, OnInit } from '@angular/core';
import { ParserService } from '../parser.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [
    trigger('seria',[
      transition(':enter',[
        style({transform:'translateY(-100%)', opacity:0}),
        animate(500,style({transform:'translateY(0%)', opacity:1}))
      ]),
      transition(':leave',[
        animate(300, style({transform:'translateX(100%)', opacity:0}))
      ])
    ])
  ]
})

export class MainComponent implements OnInit {

  constructor(private parserService: ParserService) { }

  ngOnInit() {}


  myItems: String[];
  selectedItem=null;
  currentDisp=null;

//file download
  FileDownl(e) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.myItems = fileReader.result.split('\r\n');
    }
    fileReader.readAsText(e.target.files.item(0));
  }

  //select item
  onSelectItem(item){
    this.selectedItem= item;
  }

  isModalVisible=false;


  modalVisible(){
		this.isModalVisible=!this.isModalVisible;
	}

  goParse(){
    if(this.selectedItem!==null){
      this.parserService.parsuj(this.selectedItem).subscribe(
        item => { this.currentDisp = item }
      );
      this.modalVisible();
    }
  }


}

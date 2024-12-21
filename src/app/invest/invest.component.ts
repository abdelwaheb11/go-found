import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project.model';
import { ProjectService } from '../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from '../services/image.service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-invest',
  templateUrl: './invest.component.html',
  styleUrls: ['./invest.component.css']
})
export class InvestComponent implements OnInit {
  project !: Project
  investmentAmount: number = 0;
  error=false
  msgError =''

  constructor(private projectservice: ProjectService , private route : ActivatedRoute , public imageservice :ImageService) {}

  ngOnInit(): void {
    this.projectservice.getProjectById(this.route.snapshot.params[('id')]).subscribe(
      res=>this.project=res
    )
  }

  addInvestment(): void {
    this.error=false
    if (this.investmentAmount <= 0) {
      this.error = true
      this.msgError="Amount must be greater than 0";
      return;
    }

    if (this.investmentAmount > this.project.goal_amount-this.project.raised_amount) {
      this.error = true
      this.msgError = `Investment amount exceeds the remaining goal amount. 
                        You can only invest up to $${(this.project.goal_amount - this.project.raised_amount).toFixed(2)}.`
      return;
    }


  
    
    this.projectservice.investe(this.investmentAmount, this.project.id).subscribe(
      (res) => {
        if (this.project.investment) {
          this.project.investment.push(res);
        } else {
          this.project.investment = [res];
        }
  
        
        this.project.raised_amount = Number(this.project.raised_amount)+  Number(this.investmentAmount);
  
        
        this.investmentAmount = 0;
      },
      (error) => {
        
        console.error("Error adding investment:", error);
      }
    );
  }
  
}

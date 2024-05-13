import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DataService } from '../../services/data.service';
import { Country, District, Place, State } from '../../models';

@Component({
  selector: 'app-home-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home-form.component.html'
})
export class HomeFormComponent implements OnInit {
  countryData = [
    { id: "1", name: "India" },
    { id: "2", name: "Germany" }
  ];
  
  countryDetail: Array<Country> = [];
  selectedCountryId: string = '';

  stateDetail: Array<State> = [];
  selectedStateId: string = '';

  districtDetail: Array<District> = [];
  selectedDistrictId: string = '';

  placesDetail: Array<Place> = [];

  constructor( private dataServices: DataService) {}

  ngOnInit() {
    this.countryDetail =  JSON.parse(this.dataServices.getDetail());
  }

  onCountrySelect() {
    let stateData = this.countryDetail[Number(this.selectedCountryId)];
    if(stateData) {
      this.stateDetail = stateData.states;
      this.districtDetail = [];
      this.placesDetail = [];
    }
  }

  onStateSelect() {
    let districtData = this.stateDetail.find(state => state.id === this.selectedStateId);
    if(districtData) {
      this.districtDetail = districtData.districts;
    }
  }

  onDistrictSelect() {
    let placeData = this.districtDetail.find(place => place.id === this.selectedDistrictId);
    if(placeData) {
      this.placesDetail = placeData.places;
    }
  }
}

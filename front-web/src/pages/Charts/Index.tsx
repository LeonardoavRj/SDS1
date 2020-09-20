import React, { useState, useEffect } from 'react';
import Filters from '../../components/Filters/Index'
import './styles.css';
import{barOptions,pieOptions} from './chart-options'
import Chart from 'react-apexcharts';
import axios from 'axios';
import {buildBarSeries, getPlatformChartData, getGenderChartData} from './helpers';

type PieCharData ={
    labels: string[];
    series: number[];
}
type BarCharData = {
    x : string;
    y : number;

}
const initialPieData  ={
    labels: [],
    series:[]
}
const BASE_URL = 'http://localhost:8080';

const Charts = () =>{
    const [barCharData,setBarCharData] = useState<BarCharData[]>([]);
    const [platformData,setPlatformData] = useState<PieCharData>(initialPieData); 
    const [genderData,setGenderData] = useState<PieCharData>(initialPieData);
    useEffect(() => {
        async function getData(){
            const recordResponse = await axios.get(`${BASE_URL}/records`);
            const gameResponse = await axios.get(`${BASE_URL}/games`);
            const barData = buildBarSeries(gameResponse.data,recordResponse.data.content);
            setBarCharData(barData);

            const platformChartData = getPlatformChartData(recordResponse.data.content);
            setPlatformData(platformChartData);

            const genderChartData = getGenderChartData(recordResponse.data.content);
            setGenderData(genderChartData);

        }
        getData();
    },[])
    return (
       <div>
        <Filters link="/Records" linkText="VER TABELA" />
        <div className="chart-container">
            <div className="top-related">
                <h1 className="top-related-title">
                    JOGOS MAIS VOTADOS
                </h1>
               <div className="games-container">
                    <Chart options={barOptions}
                    type="bar"
                    width='900'
                    height='650'
                    series={[{data:barCharData}]}
                    
                     />
               </div>
            </div>
            <div className="charts">
              <div className="platform-chart">
                  <h2 className="chart-title">Plataformas</h2>
                  <Chart 
                  options={{...pieOptions,labels:platformData?.labels}}
                  type="donut"
                  series={platformData?.series}
                  width="350"
                  />
              </div>
              <div className="gender-chart">
                  <h2 className="chart-title">Gênero</h2>
                  <Chart 
                  options={{...pieOptions,labels:genderData?.labels}}
                  type="donut"
                  series={genderData?.series}
                  width="350"
                  />
              </div>
            </div>
        </div>
       </div>
    )
}
export default Charts;
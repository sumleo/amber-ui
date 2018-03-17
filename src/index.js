import React from 'react';
import ReactDOM from 'react-dom';
import NavHead from './NavHead'
import registerServiceWorker from './registerServiceWorker';
import {Grid, Row, Col, Well,ButtonToolbar,Button} from 'react-bootstrap';
import DataTable from './DataTable'
import { tsvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";
import Chart from './CandleStickChartWithFullStochasticsIndicator';
import { TypeChooser } from "react-stockcharts/lib/helper";
function parseData(parse) {
    return function(d) {
        d.date = parse(d.date);
        d.open = +d.open;
        d.high = +d.high;
        d.low = +d.low;
        d.close = +d.close;
        d.volume = +d.volume;
        return d;
    };
}

const parseDate = timeParse("%Y-%m-%d");

export function getData() {
    const promiseMSFT = fetch("//rrag.github.io/react-stockcharts/data/MSFT.tsv")
        .then(response => response.text())
        .then(data => tsvParse(data, parseData(parseDate)))
    return promiseMSFT;
}


/*latest bootstrap css file with cdn*/
const bootstrapCss = <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
                           integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
                           crossorigin="anonymous"/>;
class ChartComponent extends React.Component {
    componentDidMount() {
        let row={
            
        }
        getData().then(data => {
            this.setState({ data })
            console.log(data)
        })
    }
    render() {
        if (this.state == null) {
            return <div>Loading...</div>
        }
        return (
            <TypeChooser>
                {type => <Chart type={type} data={this.state.data} />}
            </TypeChooser>
        )
    }
}

ReactDOM.render(<div>
    {bootstrapCss}
    <Grid fluid={true}>
        <Well>
            <NavHead/>
            {/* chart and table begin*/}
            <Row>
                {/*chart begin*/}
                <Col sm={6} md={6}>
                    <ChartComponent/>
                </Col>
                {/*chart end*/
                /*table begin*/}
                <Col sm={6} md={6}>
                    <DataTable/>
                    <Row>
                        <Col sm={4} md={4}><Button bsStyle="success" bsSize={"lg"}>To</Button></Col>
                        <Col sm={4} md={4}><Button bsStyle="warning" bsSize={"lg"}>Be</Button></Col>
                        <Col sm={4} md={4}><Button bsStyle="primary" bsSize={"lg"}>Or</Button></Col>
                        <br/>
                        <Col sm={4} md={4}><Button bsStyle="danger" bsSize={"lg"}>Not</Button></Col>
                        <Col sm={4} md={4}><Button bsStyle="info" bsSize={"lg"}>To</Button></Col>
                        <Col sm={4} md={4}><Button bsSize={"lg"}>Be</Button></Col>
                    </Row>
                </Col>
                {/*table end*/}
            </Row>
            {/*chart and table end*/}
        </Well>
    </Grid>
</div>, document.getElementById('root'));
registerServiceWorker();

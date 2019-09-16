import React, { Component } from "react";
import axios from "axios";
import { ReactTabulator } from "react-tabulator";
import "tabulator-tables/dist/css/tabulator.min.css"; //import Tabulator stylesheet
import Modal from './Modal'


export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jobs: [],
      errorMsg: "",
      isShowing: false
    };
  }

  openModalHandler = function() {
    this.setState({
        isShowing: true
    });
}

closeModalHandler = () => {
    this.setState({
        isShowing: false
    });
}


  componentDidMount() {
    var config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    };
    axios
      .get("https://nut-case.s3.amazonaws.com/jobs.json", config)
      .then(response => {
        this.setState({ jobs: response.data.data });
      })
      .catch(error => {
        this.setState({
          errorMsg: `Error retreiving todo's data. Detailed error : ${error}`
        });
      });
  }


  render() {
    const { jobs, errorMsg, isShowing } = this.state;
    var that = this

    var applyButton = function(cell, formatterParms) {
      return "<a href="+cell.getRow().getData().applylink+" type='button' class='btn btn-success' target=_blank>Apply</button>"     
    }

    const columns = [
      { title: "Title", field: "title",formatter: "textarea", width: 200, align: "center", headerFilter: "input" },
      {
        title: "Job Description",
        field: "jd",
        formatter: "textarea",
        width: 350,
        align: "left",
      },
      {
        title: "Company Name",
        field: "companyname",
        width: 150,
        align: "left",
        headerFilter: "input"
      },
      {
        title: "Location",
        field: "location",
        width: 150,
        align: "left",
        headerFilter: "input"
      },
      {
        title: "Experience",
        field: "experience",
        width: 150,
        align: "left",
        headerFilter: "input"
      },
      {
        title: "Skills",
        field: "skills",
        width: 200,
        align: "left",
        headerFilter: "input"
      },
      {
        title: "Salary",
        field: "salary",
        width: 150,
        align: "left",
        headerFilter: "input"
      },
      {
        title: "Start Date",
        field: "startdate",
        width: 150,
        align: "left",
        headerFilter: "input"
      },
      {
        title: "End Date",
        field: "enddate",
        width: 150,
        align: "left",
        headerFilter: "input"
      },
      {
        title: "Apply Link",
        field: "applylink",
        cellClick:function(e, cell) {
          e.stopPropagation();
          return
        },
        formatter: applyButton,
        width: 150,                  
        align: "center",
      }
    ];

    const options = {
      layoutColumnsOnNewData: true,
      layout: "fitDataFill", //fit columns to width of table (optional)
      responsiveLayout: "false", //hide columns that dont fit on the table
      tooltips: true, //show tool tips on cells
      addRowPos: "top", //when adding a new row, add it to the top of the table
      history: true, //allow undo and redo actions on the table
      groupBy: "null",
      pagination: "local", //paginate the data
      paginationSize: 20, //allow 20 rows per page of data
      paginationSizeSelector: [20, 50, 100, 200],
      movableColumns: true, //allow column order to be changed
      resizableRows: true, //allow row order to be changed
      invalidOptionWarnings: false,
      rowClick:function(e, row) {
        Modal.defaultProps = {
          title: row.getData().title,
          exp: row.getData().experience,
          jd: row.getData().jd,
          salary: row.getData().salary,
          location: row.getData().location,
          applylink: row.getData().applylink
        }
        that.openModalHandler()
      }
    };

    return (
      <div>
        <ReactTabulator
          data= {jobs}
          columns={columns}
          tooltips={true}
          layout={"fitDataFill"}
          options={options}
        />
        {errorMsg ? <div>{errorMsg}</div> : null}
        <Modal
            show={isShowing}
            onHide={this.closeModalHandler}
        ></Modal>
      </div>
    );
  }
}

export default Home;

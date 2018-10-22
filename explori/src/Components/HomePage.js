/**
HomePage.js

The First Page the User sees when they enter the application

**/

//react
import React, { Component } from "react";

//lib
import _ from 'lodash';

//material ui
import Typography from "@material-ui/core/Typography";

//Forms
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';


// Styling for JavaScript
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

//api interface
import ApiInterface from "../Lib/ApiInterface";

//Models
import Collection from "../Models/Collection";

//components
import CollectionGrid from "./CollectionGrid";

//styling
const styles = {
  title: {
    marginTop: "16px",
    textAlign: "center"
  },
  formControlContainer: {
    textAlign: 'center'
  },
  formControl: {
    minWidth: '245px'
  }
};

//define the HomePage class

class HomePage extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      collections: [],
      source: null,
      sources: []
    };

    //bind the functions
    this.loadInData = this.loadInData.bind(this);
    this.generateSourceOptions = this.generateSourceOptions.bind(this);
    this.getSourceId = this.getSourceId.bind(this);
    this.handleSourceChange = this.handleSourceChange.bind(this);

    //clear the item selection
    this.props.clearItemSelection();

    //clear the collection selection
    this.props.clearCollectionSelection();

    if (this.props.selected_source_id === null) {
      this.props.grabStartingSource();
    }


    //load in the data from the server
    this.loadInData()

  }

  //loads in the data from the server
  loadInData(source_id = null) {

    var grab_collections;

    if (this.props.selected_source_id === null) {
      grab_collections = ApiInterface.getCollections()
    }else {

      if (source_id === null) {

        grab_collections = ApiInterface.getSourceCollections(this.props.selected_source_id)

      }else {
        grab_collections = ApiInterface.getSourceCollections(source_id)

      }

    }

    grab_collections
      .then(
        function(collections) {
          this.setState({
            ...this.state,
            collections
          });

          if (this.props.selected_source_id === null) {
            return new Promise ((resolve, reject) => {
              resolve(null)
            })
          }else {
            return ApiInterface.getSource(this.props.selected_source_id)
          }

        }.bind(this)
      ).then (function (source) {
        this.setState({
          ...this.state,
          source
        })

        return ApiInterface.getSources()

      }.bind(this)).then (function (sources) {
        this.setState({
          ...this.state,
          sources
        })
      }.bind(this))
      .catch(function(err) {
        console.log(err);
        console.log("server probably not up");
      });
  }

  generateSourceOptions() {
    let source_options = [];
    let sources = this.state.sources;

    _.map(sources, function (source, idx) {
      source_options.push(
        <MenuItem key = {idx} value={source.id}>{source.name}</MenuItem>
      )
    })

    return source_options

  }

  getSourceId() {
    if (this.state.source !== null) {
      return this.state.source.id;
    }else {
      return null;
    }
  }

  handleSourceChange(e) {
    let source_id = e.target.value;
    this.props.selectSource(source_id);
    this.loadInData(source_id);

  }

  //Render the HomePage w/ a grid of collections
  render() {
    const { classes } = this.props;

    return (
      <div className="HomePage">
        <div className="Items">
          <Typography variant="display2" className={classes.title}>

            {this.state.source !== null && (<div>
              Exhibits for the {this.state.source.name} Adventure!
            </div>)}

            {this.state.source === null && (
              <div>Exhibits </div>)
            }

          </Typography>

          <div class = {classes.formControlContainer} >
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="source-select">Source</InputLabel>
            <Select
              value = {this.getSourceId()}
              onChange = {this.handleSourceChange}
              inputProps={{
                name: 'source',
                id: 'source-select',
              }}
            >
              {this.generateSourceOptions()}
            </Select>
          </FormControl>
        </div>

          <CollectionGrid collections={this.state.collections} rowlength={2} />
        </div>
      </div>
    );
  }
}

//styling helper config
HomePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomePage);

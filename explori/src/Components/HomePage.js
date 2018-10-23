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

    //set default state
    this.state = {
      collections: [],
      source: null,
      source_id: 0,
      sources: []
    };

    //bind the functions
    this.loadInData = this.loadInData.bind(this);
    this.generateSourceOptions = this.generateSourceOptions.bind(this);
    this.handleSourceChange = this.handleSourceChange.bind(this);
    this.grabRandomSource = this.grabRandomSource.bind(this);

    //clear the item selection
    this.props.clearItemSelection();

    //clear the collection selection
    this.props.clearCollectionSelection();

    //if there is no selected source
    if (this.props.selected_source_id === null) {

      //grab a random source and then load it in + save
      this.grabRandomSource().then (function (selected_source) {
        this.props.selectSource(selected_source.id);
        this.loadInData(selected_source.id);
      }.bind(this))

    }else {
      //load in the data from the server
      this.loadInData()
    }


  }

  //grabs a random source to start if the starting source has not been saved
  grabRandomSource() {
    return new Promise((resolve, reject) => {
      ApiInterface.getSources().then (function (sources) {
        let rando_source = _.sample(sources);
        resolve(rando_source);
      }).catch (function (err) {
        reject(err);
      })
    })
  }

  //loads in the data from the server
  loadInData(source_id = null) {

    var grab_collections;

    if (this.props.selected_source_id === null) {
      grab_collections = ApiInterface.getCollections()
    }else {

      //if no source id specified, use all collections, else
      //filter by the source

      if (source_id === null) {

        grab_collections = ApiInterface.getSourceCollections(this.props.selected_source_id)

      }else {
        grab_collections = ApiInterface.getSourceCollections(source_id)

      }

    }

    grab_collections
      .then(
        // update the collections of the state
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
        // update the selected source
        this.setState({
          ...this.state,
          source,
          source_id: source.id
        })

        return ApiInterface.getSources()

      }.bind(this)).then (function (sources) {
        //grabs the sources
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

  //generate the source options
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

  //handle the source change via option menu
  handleSourceChange(e) {
    let source_id = e.target.value;

    this.setState({
      ...this.state,
      source_id
    })

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

          <div className = {classes.formControlContainer} >
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="source-select">Source</InputLabel>
              <Select
                value = {this.state.source_id}
                onChange = {this.handleSourceChange}
                inputProps={{
                  name: 'source',
                  id: 'source-select',
                }}
                name = "source-select"
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

//Carto focus + Context with autonome functions

function getMockData(dataIndex) {
  var d3data;
  //Appelle main.php de manière synchrone. C'est à dire, attend la réponse avant de continuer
  $.ajax({
    type: 'GET',
    url: '/data/d3data',
    dataType: 'json',
    success: function(t_data) {
      d3data = t_data[dataIndex];
      return false;
    },
    error: function(t_data) {
      console.log("Erreur Ajax : Message=" + t_data + " (Fonction getD3Data()) !");
    },
    async: false
  });
  return d3data;
}

function menuInitialisation(myGraph) {

  if (myGraph.config.debug) console.log("checkboxInitialisation start");

  $('#focusContextNodeOff').hide();

  if (myGraph.config.curvesLinks == 'On')
    $('#curvesLinksCheckbox').checkbox('check');
  else
    $('#curvesLinksCheckbox').checkbox('uncheck');

  if (myGraph.config.openNodeOnHover == 'On')
    $('#openNodeOnHoverCheckbox').checkbox('check');
  else
    $('#openNodeOnHoverCheckbox').checkbox('uncheck');

  if (myGraph.config.force == 'On')
    $('#activeForceCheckbox').checkbox('check');
  else
    $('#activeForceCheckbox').checkbox('uncheck');

  if (myGraph.config.elastic == 'On')
    $('#activeElasticCheckbox').checkbox('check');
  else
    $('#activeElasticCheckbox').checkbox('uncheck');

  if (myGraph.config.displayId == 'On')
    $('#displayIdCheckbox').checkbox('check');
  else
    $('#displayIdCheckbox').checkbox('uncheck');

  if (myGraph.typeLdpServer == 'external')
  {
    $('#typeLdpServerCheckbox').checkbox('check');
    $('#graphNameSegment').hide();
  }
  else
  {
    $('#typeLdpServerCheckbox').checkbox('uncheck');
    $('#graphNameSegment').show();
  }

  if (myGraph.config.makeLinkSelectingNode == 'On')
    $('#LinkCreationModeCheckbox').checkbox('check');
  else
    $('#LinkCreationModeCheckbox').checkbox('uncheck');

  if (myGraph.config.debug) console.log("checkboxInitialisation end");
}

$(document).ready()
{
  var myGraph = new FluidGraph();

  myGraph.initSvgContainer("#chart");
  myGraph.mockData0 = getMockData(0);

  var store = new MyStore({ container : myGraph.externalStore.uri,
                            context : myGraph.externalStore.context,
                            template : "",
                            partials : ""})

  // location.hash = #https://ldp.virtual-assembly.org:8443/2013/cartopair/2a1499b5dc
  if (window.location.hash)
  {
    // myGraph.ldpGraphName = https://ldp.virtual-assembly.org:8443/2013/cartopair/2a1499b5dc
    myGraph.ldpGraphName = window.location.hash.substring(1);
    myGraph.openedGraph = myGraph.ldpGraphName;
    // myGraph.graphName = 2a1499b5dc
    myGraph.graphName = myGraph.openedGraph.split("/").pop();
    // myGraph.externalStore.uri = https://ldp.virtual-assembly.org:8443/2013/cartopair/
    myGraph.externalStore.uri = myGraph.openedGraph.split(myGraph.graphName)[0];
    myGraph.typeLdpServer = "external";
  }
  else
    myGraph.openedGraph = myGraph.getOpenedGraph();

  myGraph.openedGraph = "http://benoit-alessandroni.fr/ldp/actor/benoit-alessandroni/";
  myGraph.typeLdpServer = "external";

  var testGraph;
  if (myGraph.openedGraph)
  {
    testGraph = myGraph.loadGraph(myGraph.typeLdpServer, myGraph.openedGraph);
  }
  else {
    //Load default graph (Démo, explaination...)
    myGraph.d3Data = getMockData(3);
  }

  var checkboxIsInitialized = false;
  menuInitialisation(myGraph);

  if (myGraph.config.force == "On") {
    myGraph.activateForce();
  } else {
    $('#activeElasticCheckbox').addClass('disabled');
  }

  checkboxIsInitialized = true;

  if (testGraph == true)
  {
    if (myGraph.d3Data.nodes.length > 0)
    {
      myGraph.drawGraph();
      if (thisGraph.config.force == "Off")
      {
        thisGraph.movexy.call(thisGraph);
      }
    }
  }
}

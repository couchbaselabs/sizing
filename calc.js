//------------------------------------------------------
// Global Functions
//------------------------------------------------------
var instances=0;
var block={};
$(document).ready(function() {
    $("#sliderBuckets").slider({
        value: 0,
        min: 0,
        max: 10,
        step: 1,
        slide: function (event, ui) {
            $("#sliderBuckets-value").val(ui.value);
            instances=ui.value;
            buildInstances(ui.value);
            buildInstancesJS();
        }
    });

    $("#sliderBuckets-value").val($("#sliderBuckets").slider('value'));
    $("#sliderBuckets-value").change(function () {
        var value = this.value;
        if(parseInt(value)>0 && parseInt(value)<11){
            instances = value;
            buildInstances();
            buildInstancesJS();
            $("#sliderBuckets").slider("value", parseInt(value));
        }
    });
});

function buildInstances(){
    var instanceHTML="";
    for(var i=0; i<instances;i++) {
        var inst="bucket"+ i;
        instanceHTML += '<table style="border:3px solid #cccccc;" id="' + inst + '"> <tr> <td valign="top"> <table width="100%"> <tr> <td><h1> BUCKET:'+ (i+1) + '</h1></td></tr><tr> <td><div id="' + inst + 'sliderCores"></div></td><td><div id="' + inst + 'sliderRam"></div></td></tr><tr> <td>Cores: <input id="' + inst + 'sliderCores-value" size="4"> </td><td>RAM: <input id="' + inst + 'sliderRam-value" size="4"> </td></tr><tr> <td></td><td><div id="' + inst + 'sliderXDCR"></div></td></tr><tr> <td></td><td>XDCR: <span id="' + inst + 'sliderXDCR-value"></span></td></tr><tr> <td><div id="' + inst + 'sliderReplica"></div></td><td><div id="' + inst + 'sliderPerc"></div></td></tr><tr> <td>Replicas: <span id="' + inst + 'sliderReplica-value"></span></td><td>Working Set Percentage: <span id="' + inst + 'sliderPerc-value"></span>%</td></tr><tr> <td colspan="2" style="border: 1px solid #D0D0D0;"> <table> <tr> <td><h1>Storage:</h1></td><td><h1>Ver:</h1></td><td><h1>Views?</h1></td><td id="' + inst + 'tdThreadSlider"><div id="' + inst + 'sliderThread"></div></td></td><td id="' + inst + 'tdTunableHeader"><h1>Eviction:</h1></td></tr><tr> <td> <select id="' + inst + 'selDrives"> <option value="3500">HDD</option> <option value="10000">SSD</option> <option value="20000">SSD (ENT)</option> <option value="1500">EBS (AMZ)</option> <option value="5000">IOPS (AMZ)</option> </select></td><td> <select id="' + inst + 'selVersion"> <option value="2">2.XX</option> <option value="3">3.XX</option> </select></td><td> <select id="' + inst + 'selView"> <option value="0">NO</option> <option value="1">YES</option> </select></td><td id="' + inst + 'tdThreadHeader">Thread Pool (%): <input id="' + inst + 'sliderThread-value" size="3"> </td><td id="' + inst + 'tdTunableSelect"> <select id="' + inst + 'selVersion"> <option value="0">Full</option> <option value="1">Value</option> </select></td></tr></table></td></tr></table> <p> <div class="classTable"> <table> <tr> <td colspan="2">Document Size Info</td></tr><tr> <td>Key Size (in Bytes):</td><td> <input type="text" id="' + inst + 'keySize" value="40"/> </td></tr><tr> <td>Value Size (in Bytes):</td><td> <input type="text" id="' + inst + 'valSize" value="5120"> </td></tr><tr> <td>Total Number of Documents:</td><td> <input type="text" id="' + inst + 'valDocs" value="1000000"> </td></tr></table> <table> <tr> <td colspan="2 ">Operations Per Second</td></tr><tr> <td>Sustained Read Rate (ops/sec):</td><td> <input type="text" id="' + inst + 'rateRead" value="1000"> </td></tr><tr> <td>Sustained Write Rate (ops/sec):</td><td> <input type="text" id="' + inst + 'rateWrite" value="1000"> </td></tr><tr> <td>Sustained Deletions (ops/sec):</td><td> <input type="text" id="' + inst + 'rateDelete" value="1000"> </td></tr></table> <table id="' + inst + 'tableView"> </tr><td colspan="2">Views</td></tr><tr> <td>Number of Views</td><td> <input type="text" id="' + inst + 'viewNum" value="0"> </td></tr><tr> <td>% of Docs Matching</td><td> <input type="text" id="' + inst + 'viewMatch" value="10"> </td></tr><tr> <td>Size of info that matches (%)</td><td> <input type="text" id="' + inst + 'viewSize" value="10"> </td></tr><tr> <td>Rows per Match</td><td> <input type="text" id="' + inst + 'viewRows" value="1"> </td></tr></table> </div></td><td valign="top"> <div class="classTableOutput"> <table> <tr> <td colspan="2">Bucket ' + (parseInt(i)+1)+' Outputs</td></tr><tr> <td>Memory Bound Nodes:</td><td style="background-color:#FFFF00"><label id="' + inst + 'lblMemBound"/></td></tr><tr> <td>Total Memory Used:</td><td><label id="' + inst + 'lblMemPerNode"/></td></tr><tr> <td>Disk Bound Nodes:</td><td style="background-color:#FFFF00"><label id="' + inst + 'lblDiskBound"/></td></tr><tr> <td>Total Disk Space Used:</td><td><label id="' + inst + 'lblTotalDisk"/></td></tr></table> </div><br><div id="' + inst + 'tableConstants" class="classTableConstants"> <table> <tr> <td valign="bottom"> <form id="' + inst + 'lockForm" action=""> <input type="radio" id="' + inst + 'radio1" name="group1" value="locked" checked> <label for="radio1">lock</label> <input type="radio" id="' + inst + 'radio2" name="group1" value="unlocked"> <label for="radio2">unlock</label> </form></td><td>Constants</td></tr><tr> <td>Compaction Threshold:</td><td> <input type="text" id="' + inst + 'compactionThresholdConstant" value=".05" readonly> </td></tr><tr> <td>Background Fetch Threshold:</td><td> <input type="text" id="' + inst + 'backgroundThresholdConstant" value=".05" readonly> </td></tr><tr> <td>Background Fetch XDCR:</td><td> <input type="text" id="' + inst + 'backgroundThresholdXDCR" value=".05" readonly> </td></tr><tr> <td>Meta Data:</td><td> <input type="text" id="' + inst + 'metaDataConstant" value="56" readonly> </td></tr><tr> <td>OS Headroom:</td><td> <input type="text" id="' + inst + 'osHeadroomConstant" value=".20" readonly> </td></tr><tr> <td>Couchbase High Memory Watermark:</td><td> <input type="text" id="' + inst + 'highMemConstant" value=".85" readonly> </td></tr><tr> <td>Ammend Multiplier:</td><td> <input type="text" id="' + inst + 'amendMultiplierConstant" value="3" readonly> </td></tr><tr> <td>Fragment Multiplier:</td><td> <input type="text" id="' + inst + 'fragmentMultiplierConstant" value="1" readonly> </td></tr></table> </div></td></tr></table>'
    }
    $('#instances').html(instanceHTML);
    }

function buildInstancesJS(){
    for(var i=0; i<instances;i++){
        block[i]= new instance("bucket"+i);
        block[i].recalc();
    }
}

function calcGlobal(){
    var diskBound=0;
    var memBound=0;
    var totalDisk=0;
    var totalMem=0;
    for(var i=0; i<instances;i++){
        var bucket="bucket"+i;
        diskBound+= parseInt($("#" + bucket+"lblDiskBound").html());
        memBound+= parseInt($("#" + bucket+"lblMemBound").html());
        totalDisk+=  parseInt($("#" + bucket+"lblTotalDisk").html());
        totalMem+=  parseInt($("#" + bucket+"lblMemPerNode").html());
    }
    $("#lblDiskBoundGlobal").html(diskBound);
    $("#lblMemBoundGlobal").html(memBound);
    $("#lblMemPerNodeGlobal").html(totalMem+" Gigs");
    $("#lblTotalDiskGlobal").html(totalDisk+" Gigs");
}

//------------------------------------------------------
// Build Instances
//------------------------------------------------------
var instance=function(bucket) {
    var self = this;
    this.sizing = {
        "cores": 1,
        "ram": 8,
        "XDCR": 0,
        "replica": 1,
        "perc": 1,
        "buckets": 1,
        "drive": 1,
        "keySize": 40,
        "valueSize": 5120,
        "totalDocs": 1000000,
        "readRate": 1000,
        "writeRate": 1000,
        "delRate": 1000,
        "compactionThreshold": .05,
        "backgroundFetchThreshold": .05,
        "backgroundFetchXDCR": .05,
        "metaData": 56,
        "osHeadroom": .20,
        "highMemWatermark": .85,
        "appendMultiplier": 3,
        "fragmentationMultiplier": 1,
        "locked": true,
        "views": false,
        "viewNum": 5,
        "viewMatch": 10,
        "viewSize": 10,
        "viewRows": 1,
        "threads": 75,
        "eviction": false
    }

//------------------------------------------------------
// Calculations Function Called from any Event
//------------------------------------------------------

    this.recalc=function() {

        self.sizing.drive = parseInt($("#" + bucket+"selDrives").val());
        self.sizing.keySize = parseInt($("#" + bucket+"keySize").val());
        self.sizing.valueSize = parseInt($("#" + bucket+"valSize").val());
        self.sizing.totalDocs = parseInt($("#" + bucket+"valDocs").val());
        self.sizing.readRate = parseInt($("#" + bucket+"rateRead").val());
        self.sizing.writeRate = parseInt($("#" + bucket+"rateWrite").val());
        self.sizing.delRate = parseInt($("#" + bucket+"rateDelete").val());
        self.sizing.compactionThreshold = parseFloat($("#" + bucket+"compactionThresholdConstant").val());
        self.sizing.backgroundFetchThreshold = parseFloat($("#" + bucket+"backgroundThresholdConstant").val());
        self.sizing.backgroundFetchXDCR = parseFloat($("#" + bucket+"backgroundThresholdXDCR").val());
        self.sizing.metaData = parseInt($("#" + bucket+"metaDataConstant").val());
        self.sizing.osHeadroom = parseFloat($("#" + bucket+"osHeadroomConstant").val());
        self.sizing.highMemWatermark = parseFloat($("#" + bucket+"highMemConstant").val());
        self.sizing.appendMultiplier = parseInt($("#" + bucket+"amendMultiplierConstant").val());
        self.sizing.fragmentationMultiplier = parseInt($("#" + bucket+"fragmentMultiplierConstant").val());
        self.sizing.viewNum = parseInt($("#" + bucket+"viewNum").val());
        self.sizing.viewSize = parseInt($("#" + bucket+"viewSize").val());
        self.sizing.viewMatch = parseInt($("#" + bucket+"viewMatch").val());
        self.sizing.viewRows = parseInt($("#" + bucket+"viewRows").val());

        // -----------------
        // Disk Calcs
        //------------------

        // Calcs
        var maxWritePerc = .15 * (1 + (1 - self.sizing.perc));
        var rebalanceOverhead = (maxWritePerc * self.sizing.drive);
        var compactionOverhead = (self.sizing.compactionThreshold * self.sizing.drive);
        var cacheMisses = (self.sizing.backgroundFetchThreshold * self.sizing.drive);
        var xdcrRate = (self.sizing.drive * self.sizing.backgroundFetchXDCR) * self.sizing.XDCR;
        var updateRate = self.sizing.drive - rebalanceOverhead - compactionOverhead - cacheMisses - xdcrRate;
        var totalWriteRate = ((self.sizing.writeRate + self.sizing.delRate) * (1 + self.sizing.replica)) * (1 + self.sizing.buckets);
        var indexOnDiskSize = ((self.sizing.viewSize / 100) * (self.sizing.viewMatch / 100)) * self.sizing.viewNum * self.sizing.viewRows;
        var diskBoundNodes = ((totalWriteRate / updateRate) + self.sizing.replica);
        if (diskBoundNodes < 3) {
            $("#" + bucket+"lblDiskBound").html("3");
        } else {
            $("#" + bucket+"lblDiskBound").html(Math.ceil(diskBoundNodes));
        }

        // -----------------
        // Mem Calcs
        //------------------

        // Calcs
        var usableMemory = self.sizing.ram * (1 - self.sizing.osHeadroom) * self.sizing.highMemWatermark;
        var totalDatasetSize = (self.sizing.totalDocs * self.sizing.valueSize * (1 + self.sizing.replica)) / 1073741824;
        var workingSetSize = totalDatasetSize * self.sizing.perc;
        var metaDatasetSize = (self.sizing.totalDocs * (self.sizing.keySize + self.sizing.metaData) * (1 + self.sizing.replica)) / 1073741824;
        var totalOnDisk = (totalDatasetSize + metaDatasetSize) * self.sizing.appendMultiplier * self.sizing.fragmentationMultiplier +
            indexOnDiskSize;
        var totalMemPerNode = workingSetSize + metaDatasetSize;
        var memBoundNodes = (totalMemPerNode / usableMemory) + self.sizing.replica;
        if (memBoundNodes < 3) {
            $("#" + bucket+"lblMemBound").html("3");
        } else {
            $("#" + bucket+"lblMemBound").html(Math.ceil(memBoundNodes));
        }

        $("#" + bucket+"lblTotalDisk").html(Math.ceil(totalOnDisk) + " Gigs");
        $("#" + bucket+"lblMemPerNode").html(Math.ceil(totalMemPerNode) + " Gigs");
        calcGlobal();
    }

//------------------------------------------------------
// Controls Constant Table Lock/Unlock
//------------------------------------------------------
this.lock=function() {
        // Change CSS
        $("#" + bucket+"tableConstants").removeClass("classTable");
        $("#" + bucket+"tableConstants").addClass("classTableConstants");

        // Make Inputs editable
        $("#" + bucket+"compactionThresholdConstant").prop('readonly', true);
        $("#" + bucket+"backgroundThresholdConstant").prop('readonly', true);
        $("#" + bucket+"backgroundThresholdXDCR").prop('readonly', true);
        $("#" + bucket+"metaDataConstant").prop('readonly', true);
        $("#" + bucket+"osHeadroomConstant").prop('readonly', true);
        $("#" + bucket+"highMemConstant").prop('readonly', true);
        $("#" + bucket+"amendMultiplierConstant").prop('readonly', true);
        $("#" + bucket+"fragmentMultiplierConstant").prop('readonly', true);

    }

this.unLock=function() {
        // Change CSS
        $("#" + bucket+"tableConstants").removeClass("classTableConstants");
        $("#" + bucket+"tableConstants").addClass("classTable");

        // Make Inputs readonly
        $("#" + bucket+"compactionThresholdConstant").prop('readonly', false);
        $("#" + bucket+"backgroundThresholdConstant").prop('readonly', false);
        $("#" + bucket+"backgroundThresholdXDCR").prop('readonly', false);
        $("#" + bucket+"metaDataConstant").prop('readonly', false);
        $("#" + bucket+"osHeadroomConstant").prop('readonly', false);
        $("#" + bucket+"highMemConstant").prop('readonly', false);
        $("#" + bucket+"amendMultiplierConstant").prop('readonly', false);
        $("#" + bucket+"fragmentMultiplierConstant").prop('readonly', false);
    }

//------------------------------------------------------
// Slider Constructors/Events
//------------------------------------------------------
    $("#" + bucket+"sliderCores").slider({
        value: 1,
        min: 1,
        max: 1024,
        step: 1,
        slide: function (event, ui) {
            $("#" + bucket+"sliderCores-value").val(ui.value);
            self.sizing.cores = ui.value;
            self.recalc();
        }
    });
    $("#" + bucket+"sliderCores-value").val($("#" + bucket+"sliderCores").slider('value'));

    $("#" + bucket+"sliderRam").slider({
        value: 8,
        min: 8,
        max: 1024,
        step: 1,
        slide: function (event, ui) {
            $("#" + bucket+"sliderRam-value").val(ui.value);
            self.sizing.ram = ui.value;
            self.recalc();
        }
    });

    $("#" + bucket+"sliderRam-value").val($("#" + bucket+"sliderRam").slider('value'));

    $("#" + bucket+"sliderXDCR").slider({
        value: 0,
        min: 0,
        max: 12,
        step: 1,
        slide: function (event, ui) {
            $("#" + bucket+"sliderXDCR-value").html(ui.value);
            self.sizing.XDCR = ui.value;
            self.recalc();
        }
    });

    $("#" + bucket+"sliderXDCR-value").html($("#" + bucket+"sliderXDCR").slider('value'));

    $("#" + bucket+"sliderReplica").slider({
        value: 1,
        min: 0,
        max: 3,
        step: 1,
        slide: function (event, ui) {
            $("#" + bucket+"sliderReplica-value").html(ui.value);
            self.sizing.replica = ui.value;
            self.recalc();
        }
    });

    $("#" + bucket+"sliderReplica-value").html($("#" + bucket+"sliderReplica").slider('value'));

    $("#" + bucket+"sliderPerc").slider({
        value: 100,
        min: 10,
        max: 100,
        step: 10,
        slide: function (event, ui) {
            $("#" + bucket+"sliderPerc-value").html(ui.value);
            self.sizing.perc = (ui.value / 100);
            self.recalc();
        }
    });

    $("#" + bucket+"sliderPerc-value").html($("#" + bucket+"sliderPerc").slider('value'));

    $("#" + bucket+"sliderThread").slider({
        value: 75,
        min: 1,
        max: 100,
        step: 1,
        slide: function (event, ui) {
            $("#" + bucket+"sliderThread-value").val(ui.value);
            self.sizing.threads = ui.value;
            self.recalc();
        }
    });
    $("#" + bucket+"sliderThread-value").val($("#" + bucket+"sliderThread").slider('value'));

    $("#" + bucket+"sliderRam-value").change(function () {
        var value = this.value;
        console.log(value);
        $("#" + bucket+"sliderRam").slider("value", parseInt(value));
        self.recalc();
    });

    $("#" + bucket+"sliderCores-value").change(function () {
        var value = this.value;
        console.log(value);
        $("#" + bucket+"sliderCores").slider("value", parseInt(value));
        self.recalc();
    });

    $("#" + bucket+"sliderThread-value").change(function () {
        var value = this.value;
        console.log(value);
        $("#" + bucket+"sliderThread").slider("value", parseInt(value));
        self.recalc();
    });

//------------------------------------------------------
// Load Event Handlers for Inputs and Dropdown
//------------------------------------------------------

    $("#" + bucket+"keySize").change(function () {
        self.recalc();
    });

    $("#" + bucket+"valSize").change(function () {
        self.recalc();
    });

    $("#" + bucket+"valDocs").change(function () {
        self.recalc();
    });

    $("#" + bucket+"rateRead").change(function () {
        self.recalc();
    });

    $("#" + bucket+"rateWrite").change(function () {
        self.recalc();
    });

    $("#" + bucket+"rateDelete").change(function () {
        self.recalc();
    });

    $("#" + bucket+"selDrives")
        .change(function () {
            self.recalc();
        });
    $("#" + bucket+"viewNum")
        .change(function () {
            self.recalc();
        });
    $("#" + bucket+"viewRows")
        .change(function () {
            self.recalc();
        });
    $("#" + bucket+"viewMatch")
        .change(function () {
            self.recalc();
        });
    $("#" + bucket+"viewSize")
        .change(function () {
            self.recalc();
        });

    $("#" + bucket+"compactionThresholdConstant")
        .change(function () {
            self.recalc();
        });
    $("#" + bucket+"backgroundThresholdConstant")
        .change(function () {
            self.recalc();
        });
    $("#" + bucket+"backgroundThresholdXDCR")
        .change(function () {
            self.recalc();
        });
    $("#" + bucket+"metaDataConstant")
        .change(function () {
            self.recalc();
        });
    $("#" + bucket+"osHeadroomConstant")
        .change(function () {
            self.recalc();
        });
    $("#" + bucket+"highMemConstant")
        .change(function () {
            self.recalc();
        });
    $("#" + bucket+"amendMultiplierConstant")
        .change(function () {
            self.recalc();
        });
    $("#" + bucket+"fragmentMultiplierConstant")
        .change(function () {
            self.recalc();
        });

    $("#" + bucket+"lockForm")
        .click(function () {
            if (self.sizing.locked) {
                self.unLock();
                self.sizing.locked = false;
            } else {
                self.lock();
                self.sizing.locked = true;
            }
        });
    //$("#" + bucket+"lockForm").click(function(){alert("clicked")});
    $("#" + bucket+"selView")
        .change(function () {
            if (parseInt($("#" + bucket+"selView").val()) == 1) {
                $("#" + bucket+"tableView").show();
            } else {
                $("#" + bucket+"tableView").hide();
            }
        });
    $("#" + bucket+"tableView").hide();

    $("#" + bucket+"selVersion")
        .change(function () {
            if (parseInt($("#" + bucket+"selVersion").val()) == 3) {
                $("#" + bucket+"tdThreadHeader").show();
                $("#" + bucket+"tdThreadSlider").show();
                $("#" + bucket+"tdTunableHeader").show();
                $("#" + bucket+"tdTunableSelect").show();
            } else {
                $("#" + bucket+"tdThreadHeader").hide();
                $("#" + bucket+"tdThreadSlider").hide();
                $("#" + bucket+"tdTunableHeader").hide();
                $("#" + bucket+"tdTunableSelect").hide();
            }
        });
    $("#" + bucket+"tdThreadHeader").hide();
    $("#" + bucket+"tdThreadSlider").hide();
    $("#" + bucket+"tdTunableHeader").hide();
    $("#" + bucket+"tdTunableSelect").hide();
}
// reCalc();
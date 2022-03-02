#targetengine "sk_anzeige_fix"
var dbg = false;

// ------------------------------------------------------------------------------------------------------------------
//	Hybrider Teil: Startup oder nicht?
// ------------------------------------------------------------------------------------------------------------------
var scriptPath, scriptFolderPath;
try {
  scriptPath  = app.activeScript.fullName;
  scriptFolderPath  = app.activeScript.parent;
} 
catch (e) { 
  /* We're running from the ESTK*/
  scriptPath = e.fileName
}
if ( scriptPath.search(/startup scripts/i) != -1 ) {
  try {
    app.removeEventListener("afterOpen", sk_anzeige_fix);
  } catch(e) {
    $.writeln( e );
  }

  app.addEventListener("afterOpen", sk_anzeige_fix);  
} else {
  if ( app.documents.length ) {
    sk_anzeige_fix( app.documents[0] );
  }
}

// ------------------------------------------------------------------------------------------------------------------
//	Event-Handler
// ------------------------------------------------------------------------------------------------------------------
function sk_anzeige_fix( e ) {
  if ( e.constructor.name == "Document" ) {
    handle_doc( e );
  } else {
    try {
      if ( e.target.constructor.name == "LayoutWindow" ) {
        handle_doc( e.target.parent );
      } else {
      }
    } catch(e) {}
  }

// ------------------------------------------------------------------------------------------------------------------
//	Die Arbeit
// ------------------------------------------------------------------------------------------------------------------
  function handle_doc( doc ) {

    doc.layoutWindows[0].overprintPreview = true;
    doc.layoutWindows[0].activePage = doc.pages.firstItem();
    // doc.layoutWindows[0].bounds = [0,0,1417,2034];
    doc.layoutWindows[0].proofingProfile = "PSO Coated v3";
    doc.layoutWindows[0].preserveColorNumbers = true;
    // doc.layoutWindows[0].proofingType = ProofingType.DOCUMENT_CMYK;
    // doc.layoutWindows[0].proofingType = ProofingType.CUSTOM;
    doc.layoutWindows[0].proofingType = ProofingType.PROOF_OFF;
    // doc.layoutWindows[0].screenMode = ScreenModeOptions.PREVIEW_TO_BLEED;
    // doc.layoutWindows[0].screenMode = ScreenModeOptions.PREVIEW_TO_PAGE;
    doc.layoutWindows[0].screenMode = ScreenModeOptions.PREVIEW_OFF;
    doc.layoutWindows[0].simulateInkBlack = true;
    doc.layoutWindows[0].simulatePaperWhite = false;
    doc.layoutWindows[0].transformReferencePoint = AnchorPoint.TOP_LEFT_ANCHOR;
    // doc.layoutWindows[0].viewDisplaySetting = ViewDisplaySettings.OPTIMIZED;
    doc.layoutWindows[0].viewDisplaySetting = ViewDisplaySettings.TYPICAL;
    // doc.layoutWindows[0].viewDisplaySetting = ViewDisplaySettings.HIGH_QUALITY;
    //doc.layoutWindows[0].zoom( ZoomOptions.FIT_PAGE );
    doc.layoutWindows[0].zoom( ZoomOptions.FIT_SPREAD );


    doc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.MILLIMETERS;
    doc.viewPreferences.verticalMeasurementUnits = MeasurementUnits.MILLIMETERS;
    doc.viewPreferences.rulerOrigin = RulerOrigin.PAGE_ORIGIN;
    doc.viewPreferences.showFrameEdges = true;
    doc.viewPreferences.showNotes = false;
    doc.viewPreferences.showRulers = true;

    doc.textPreferences.highlightCustomSpacing = true;
    doc.textPreferences.highlightHjViolations = true;
    doc.textPreferences.highlightKeeps = true;
    doc.textPreferences.highlightSubstitutedFonts = true;
    doc.textPreferences.highlightSubstitutedGlyphs = true;

    doc.textPreferences.enableStylePreviewMode = true;
    doc.textPreferences.showInvisibles = false;

    doc.gridPreferences.baselineColor = UIColors.LIGHT_GRAY;
    doc.gridPreferences.baselineGridShown = true;
    doc.gridPreferences.baselineViewThreshold = 200;
    doc.gridPreferences.documentGridShown = false;
    doc.gridPreferences.gridColor = UIColors.GRAY;
    doc.gridPreferences.gridsInBack = true;

    doc.guidePreferences.guidesInBack = true;
    doc.guidePreferences.guidesLocked = false;
    doc.guidePreferences.guidesShown = false;
    doc.guidePreferences.rulerGuidesColor = UIColors.GOLD; // apply to all?
    doc.guidePreferences.rulerGuidesViewThreshold = 200; // apply to all?

    doc.xmlViewPreferences.showAttributes = false;
    doc.xmlViewPreferences.showStructure = false;
    doc.xmlViewPreferences.showTagMarkers = false;
    doc.xmlViewPreferences.showTaggedFrames = false;
    doc.xmlViewPreferences.showTextSnippets = false;
    $.writeln( "done" );
  }
}
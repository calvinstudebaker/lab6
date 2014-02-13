'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	var url = "/project/" + idNumber;
	$.get(url, addProject); 

	console.log("User clicked on project " + idNumber);
	console.log("Get call to: " + url);
}

function addProject(response){
	console.log(response);
	var id = response.id;
	var html = "<img src='" + response.image + "' class='detailsImage'><h4>" + response.date + "</h4><p>" + response.summary + "</p>";
	$("#project" + id + " .details").html(html);
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	$.get("/palette", respondToColor);
	console.log("User clicked on color button");
}

function respondToColor(response){
	var colors = response.colors['hex'];
	$('body').css('background-color', colors[0]);
	$('.thumbnail').css('background-color', colors[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
	$('p').css('color', colors[3]);
	$('.project img').css('opacity', .75);
}
import { Pipe, PipeTransform } from '@angular/core';
import { GlossaryService } from '../providers/providers';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
*/
@Pipe({name: 'glossary'})
export class GlossaryPipe implements PipeTransform {
	constructor(public glossaryService: GlossaryService) {}

  transform(text: string) {
  	let re = /\[([^\[\]]*)\]/;
  	let terms = text.match(re);
  	
  	console.log("glossary: ", terms);
    return text
  }
}
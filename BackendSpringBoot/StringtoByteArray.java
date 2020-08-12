package com.example.SportApplication.model;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import org.apache.tomcat.util.codec.binary.Base64;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;

public class StringtoByteArray extends JsonDeserializer<byte []>{

	@Override
	public byte[] deserialize(JsonParser jsonParser, DeserializationContext ctxt) throws IOException, JsonProcessingException {
		// TODO Auto-generated method stub JsonSerializer
		return (Base64.decodeBase64(jsonParser.getText().getBytes()));
		}

}

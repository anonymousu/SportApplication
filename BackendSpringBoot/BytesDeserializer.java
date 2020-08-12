/*
 * package com.example.SportApplication.model;
 * 
 * import java.io.IOException;
 * 
 * import org.apache.tomcat.util.codec.binary.Base64;
 * 
 * import com.fasterxml.jackson.core.JsonParser; import
 * com.fasterxml.jackson.core.JsonProcessingException; import
 * com.fasterxml.jackson.databind.DeserializationContext; import
 * com.fasterxml.jackson.databind.JsonNode; import
 * com.fasterxml.jackson.databind.deser.std.StdDeserializer;
 * 
 * public class BytesDeserializer extends StdDeserializer<Pics> {
 * 
 * private static final long serialVersionUID = 1514703510863497028L;
 * 
 * public BytesDeserializer() { super(Pics.class); }
 * 
 * @Override public Pics deserialize(JsonParser p, DeserializationContext ctxt)
 * throws IOException, JsonProcessingException { JsonNode node =
 * p.getCodec().readTree(p); String base64 = node.asText(); return new
 * Pics(Base64.decodeBase64(base64)); } }
 */